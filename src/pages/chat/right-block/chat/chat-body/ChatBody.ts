import view from "./ChatBody.hbs";
import State from "../../../../../core/State";
import { Component } from "../../../../../core/Component";
import "./ChatBody.scss";
import { IChat, IChatMessageItem } from "../../../../../core/config/interfaces";
import { ADMIN, STATES } from "../../../../../core/ChatApp";
import { ChatMessageItem } from "./chat-message-item/ChatMessageItem";

window.customElements.define("chat-message-item", ChatMessageItem);

export class ChatBody extends Component {
  messages: IChatMessageItem[];
  adminId: number;

  constructor() {
    super(view);
  }

  connected(): void {
    this.addSubscriber(STATES.CURRENT_CHAT, this.chatChanged);
  }

  chatChanged = (chat: IChat | "loading"): void => {
    if (chat === "loading") {
      this.loading();
    } else {
      this.messages = <IChatMessageItem[]>State.extract(STATES.CHAT_MESSAGES);
      this.adminId = State.extract(ADMIN).id | null;
      this.render({
        messages: this.messages,
        notSelected: !State.extract(STATES.CHAT_MESSAGES),
      });
    }
  };
}
