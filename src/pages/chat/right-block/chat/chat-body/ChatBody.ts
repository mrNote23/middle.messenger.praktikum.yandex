import view from "./ChatBody.hbs";
import State from "../../../../../core/State";
import { Component } from "../../../../../core/Component";
import "./ChatBody.scss";
import { IChatMessageItem } from "../../../../../core/config/interfaces";
import { ChatMessageItem } from "./chat-message-item/ChatMessageItem";
import { ADMIN, NEW_MESSAGE, STATES } from "../../../../../core/config/types";

customElements.define("chat-message-item", ChatMessageItem);

export class ChatBody extends Component {
  messages: IChatMessageItem[] | "loading";
  adminId: number;
  notSelected = true;
  container: HTMLElement;

  constructor() {
    super(view);
  }

  connected(): void {
    this.addSubscriber(STATES.CHAT_MESSAGES, this.loadMessages);
    this.addSubscriber(NEW_MESSAGE, this.newMessage);
  }

  loadMessages = (messages) => {
    if (messages === "loading") {
      this.loading();
      this.notSelected = false;
    } else {
      if (State.extract(STATES.CURRENT_CHAT)) {
        this.notSelected = false;
      }
      this.messages = messages;
      this.adminId = State.extract(ADMIN).id | null;
      this.render({
        messages: this.messages,
        notSelected: this.notSelected,
      });
      this.scrollTop = Math.round(Number.MAX_SAFE_INTEGER / 10);
      this.container = this.querySelector("#messages_container");
    }
  };

  newMessage = (message) => {
    if (message) {
      const tmp = document.createElement("chat-message-item");
      if (this.container) {
        this.container.appendChild(tmp);
        tmp.props["message"] = message;
        this.scrollTop = Math.round(Number.MAX_SAFE_INTEGER / 10);
      }
    }
  };
}
