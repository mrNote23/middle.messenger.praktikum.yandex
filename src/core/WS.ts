import ChatApp, { ADMIN, STATES, TOKEN } from "./ChatApp";
import State from "./State";
import { API_WS_URL } from "./config/endpoints";

class WS {
  _connection: WebSocket;
  _token: string;
  _pingPong: number;
  _userId: number;
  _chatId: number;

  // constructor() {}

  public init() {
    State.subscribe(TOKEN, (token: string | null) => {
      if (token !== null) {
        /* eslint-disable */
        this._userId = State.extract(ADMIN)!.id;
        this._chatId = State.extract(STATES.CURRENT_CHAT)!.id;
        this._token = token;
        if (this._connection) {
          this._disconnect();
        }
        this._connect();
      }
    });
  }

  private _connect() {
    this._connection = new WebSocket(
      `${API_WS_URL}chats/${this._userId}/${this._chatId}/${this._token}`
    );
    this._connection.onopen = this._open.bind(this);
    this._connection.onclose = this._close.bind(this);
    this._connection.onmessage = this._message.bind(this);
    this._connection.onerror = this._error.bind(this);
  }

  private _open() {
    this.send({ content: "0", type: "get old" });
    if (!this._pingPong) {
      this._pingPong = setInterval(() => {
        this.send({ type: "ping" });
      }, 5000);
    }
  }

  private _message(response: MessageEvent) {
    const income = JSON.parse(response.data);
    if (Array.isArray(income)) {
      ChatApp.loadOldMessages(income);
    } else {
      switch (income.type) {
        case "pong":
          break;
        case "file":
        case "message":
          ChatApp.newMessage(income);
          break;
        default:
          console.log(income);
          break;
      }
    }
  }

  private _error(e: ErrorEvent) {
    console.log(e);
  }

  private _close(e: ErrorEvent) {
    console.log(e.code);
    if (e.code === 1006) {
      this._connect();
    }
  }

  public send(content) {
    this._connection.send(JSON.stringify(content));
  }

  private _disconnect() {
    try {
      clearInterval(this._pingPong);
      this._connection?.close();
    } catch (e) {
      console.log(e);
    }
  }
}

export default new WS();
