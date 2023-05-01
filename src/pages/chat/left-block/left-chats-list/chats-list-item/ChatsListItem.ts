import view from "./ChatsListItem.hbs";
import { Component } from "../../../../../core/Component";
import { IChat } from "../../../../../core/config/interfaces";
import { dateConvert } from "../../../../../utils/date-convert";
import State from "../../../../../core/State";
import { STATES } from "../../../../../core/config/types";

export class ChatsListItem extends Component {
  private _chat: IChat;

  constructor() {
    super(view);
  }

  propsChanged() {
    if (this.props) {
      this._chat = <IChat>this.props.chat;
      if (this._chat.last_message) {
        this._chat.last_message = {
          ...this._chat.last_message,
          timeDisplay:
            new Date(Date.now()).getDay() !==
            new Date(this._chat.last_message.time).getDay()
              ? dateConvert(this._chat.last_message.time, "D-M-Y h:i")
              : dateConvert(this._chat.last_message.time, "h:i"),
        };
      }
      this.render(<IChat>this._chat);
      this._onChangeChat(<IChat>State.extract(STATES.CURRENT_CHAT));
    }
  }

  connected() {
    this.onclick = (e: MouseEvent) => {
      e.preventDefault();
      this.createEvent("select", this._chat.id);
    };
    this.addSubscriber(STATES.CURRENT_CHAT, this._onChangeChat);
  }

  private _onChangeChat = (chat: IChat): void => {
    if (chat instanceof Object && this._chat) {
      if (this._chat.id === chat.id) {
        this._chat = chat;
        this.render(<IChat>this._chat);
        this.classList.add("active");
      } else {
        this.classList.remove("active");
      }
    } else {
      this.classList.remove("active");
    }
  };

  disconnected() {
    this.onclick = null;
  }
}
