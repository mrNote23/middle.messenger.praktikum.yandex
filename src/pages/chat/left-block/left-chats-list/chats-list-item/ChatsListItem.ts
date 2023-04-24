import view from "./ChatsListItem.hbs";
import { Component } from "../../../../../core/Component";
import { IChat } from "../../../../../core/config/interfaces";
import { STATES } from "../../../../../core/ChatApp";
import { dateConvert } from "../../../../../utils/date-convert";
import State from "../../../../../core/State";

export class ChatsListItem extends Component {
  chat: IChat;

  constructor() {
    super(view);
  }

  propsChanged() {
    if (this.props) {
      if (this.props.chat.last_message) {
        this.props.chat.last_message = {
          ...this.props.chat.last_message,
          time: dateConvert(this.props.chat.last_message.time),
        };
      }
      this.render(<IChat>this.props.chat);
      this.onChangeChat(<IChat>State.extract(STATES.CURRENT_CHAT));
    }
  }

  connected() {
    this.onclick = (e: MouseEvent) => {
      e.preventDefault();
      this.createEvent("select", this.props.chat.id);
    };
    this.addSubscriber(STATES.CURRENT_CHAT, this.onChangeChat);
  }

  onChangeChat = (chat: IChat) => {
    if (chat instanceof Object && this.props.chat) {
      if (this.props.chat.id === chat.id) {
        this.classList.add("active");
      } else {
        this.classList.remove("active");
      }
    }
  };

  disconnected() {
    this.onclick = null;
  }
}
