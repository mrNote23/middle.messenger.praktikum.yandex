import view from "./ChatsListItem.hbs";
import { Component } from "../../../../../core/Component";
import { IChat } from "../../../../../core/config/interfaces";
import { dateConvert } from "../../../../../utils/date-convert";
import State from "../../../../../core/State";
import { STATES } from "../../../../../core/config/types";

export class ChatsListItem extends Component {
  chat: IChat;

  constructor() {
    super(view);
  }

  propsChanged() {
    if (this.props) {
      this.chat = <IChat>this.props.chat;
      if (this.chat.last_message) {
        this.chat.last_message = <any>{
          ...this.chat.last_message,
          timeDisplay:
            new Date(Date.now()).getDay() !==
            new Date(this.chat.last_message.time).getDay()
              ? dateConvert(this.chat.last_message.time, "D-M-Y h:i")
              : dateConvert(this.chat.last_message.time, "h:i"),
        };
      }
      this.render(<IChat>this.chat);
      this.onChangeChat(<IChat>State.extract(STATES.CURRENT_CHAT));
    }
  }

  connected() {
    this.onclick = (e: MouseEvent) => {
      e.preventDefault();
      this.createEvent("select", this.chat.id);
    };
    this.addSubscriber(STATES.CURRENT_CHAT, this.onChangeChat);
  }

  onChangeChat = (chat: IChat) => {
    if (chat instanceof Object && this.chat) {
      if (this.chat.id === chat.id) {
        this.chat = chat;
        this.render(<IChat>this.chat);
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
