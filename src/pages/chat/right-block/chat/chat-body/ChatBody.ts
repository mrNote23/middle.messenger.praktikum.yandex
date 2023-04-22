import view from "./ChatBody.hbs";
import State from "../../../../../core/State";
import { Component } from "../../../../../core/Component";
import "./ChatBody.scss";
import { IChat, IChatMessageItem } from "../../../../../core/config/interfaces";
import { ADMIN, NEW_MESSAGE, STATES } from "../../../../../core/ChatApp";
import { ChatMessageItem } from "./chat-message-item/ChatMessageItem";

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
    // this.addSubscriber(STATES.CURRENT_CHAT, this.chatChanged);
    this.addSubscriber(STATES.CHAT_MESSAGES, this.loadMessages);
    this.addSubscriber(NEW_MESSAGE, this.newMessage);
  }

  loadMessages = (messages) => {
    if (messages === "loading") {
      this.loading();
      this.notSelected = false;
    } else {
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
      tmp.props["message"] = message;
      tmp.props["adminid"] = this.adminId;
      this.container.appendChild(tmp);
      this.scrollTop = Math.round(Number.MAX_SAFE_INTEGER / 10);
    }
  };

  // chatChanged = (chat: IChat | "loading"): void => {
  // console.log(chat);
  // if (chat === "loading") {
  // this.loading();
  // } else {
  //   this.messages = <IChatMessageItem[]>State.extract(STATES.CHAT_MESSAGES);
  //   this.adminId = State.extract(ADMIN).id | null;
  //   this.render({
  //     messages: this.messages,
  //     notSelected: !State.extract(STATES.CHAT_MESSAGES),
  //   });
  // }
  // };
}
