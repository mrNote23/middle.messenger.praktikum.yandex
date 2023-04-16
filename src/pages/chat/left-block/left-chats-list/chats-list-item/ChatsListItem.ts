import view from "./ChatsListItem.hbs";
import { Component, TProps } from "../../../../../core/Component";
import { IChat } from "../../../../../core/config/interfaces";
import { STATES } from "../../../../../core/ChatApp";
import { dateConvert } from "../../../../../utils/date-convert";

export class ChatsListItem extends Component {
  chat: IChat;

  constructor() {
    super(view);
  }

  connected() {
    this.getProps.then((props: TProps) => {
      this.chat = props.chat;
      this.chat.last_message = {
        ...this.chat.last_message,
        time: dateConvert(this.chat.last_message.time),
      };
      this.render(this.chat);
      this.onclick = (e: MouseEvent) => {
        e.preventDefault();
        this.createEvent("select", this.chat.id);
      };
      this.addSubscriber(STATES.CURRENT_CHAT, this.onChangeChat);
    });
  }

  onChangeChat = (chat: IChat) => {
    if (chat instanceof Object) {
      if (this.chat.id === chat.id) {
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
