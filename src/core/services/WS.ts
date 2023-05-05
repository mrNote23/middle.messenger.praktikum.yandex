import State from "../State";
import { API_WS_URL } from "../API/endpoints";
import { MessagesController } from "../controllers/MessagesController";
import { ADMIN, STATES, TEventTarget, TOKEN } from "../config/types";
import { IChat, IUser } from "../config/interfaces";

class WS {
  private _connection: WebSocket;
  private _token: string;
  private _pingPong = undefined;
  private _userId: number;
  private _chatId: number;

  public init() {
    State.subscribe(TOKEN, this._changedToken);
  }

  private _changedToken = (token: string | null): void => {
    if (token !== null) {
      this._userId = (State.extract(ADMIN) as IUser).id;
      this._chatId = (State.extract(STATES.CURRENT_CHAT) as IChat).id;
      this._token = token;
      if (this._connection) {
        this._disconnect();
      }
      this._connect();
    }
  };

  private _connect(first = true): void {
    this._connection = new WebSocket(
      `${API_WS_URL}/${this._userId}/${this._chatId}/${this._token}`
    );
    if (first) {
      this._connection.onopen = this._open.bind(this);
    }
    this._connection.onclose = this._close.bind(this);
    this._connection.onmessage = this._message.bind(this);
    this._connection.onerror = this._error.bind(this);
  }

  private _open(): void {
    this.send({ content: "0", type: "get old" });
    if (!this._pingPong) {
      this._pingPong = setInterval(() => {
        this.send({ type: "ping" });
      }, 15000);
    }
  }

  private _message(response: MessageEvent): void {
    const income = JSON.parse(response.data);
    if (Array.isArray(income)) {
      MessagesController.loadOldMessages(income);
    } else {
      switch (income.type) {
        case "pong":
          break;
        case "file":
        case "message":
          MessagesController.newMessage(income);
          break;
        default:
          console.log(income);
          break;
      }
    }
  }

  private _error(e: ErrorEvent): void {
    console.log(e);
  }

  private _close(e: TEventTarget): void {
    if (e.code === 1006) {
      setTimeout(() => {
        this._connect(false);
      }, 5000);
    }
  }

  public send(content: object): void {
    this._connection.send(JSON.stringify(content));
  }

  private _disconnect(): void {
    try {
      clearInterval(this._pingPong);
      this._connection.close(1000);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new WS();
