import view from "./ChatBody.hbs";
import State from "../../../../../core/State";
import { Component } from "../../../../../core/Component";
import "./ChatBody.scss";
import { IChatMessageItem } from "../../../../../core/config/interfaces";
import { ChatMessageItem } from "./chat-message-item/ChatMessageItem";
import { NEW_MESSAGE, STATES } from "../../../../../core/config/types";

customElements.define("chat-message-item", ChatMessageItem);

export class ChatBody extends Component {
  messages: IChatMessageItem[] | string;
  // private _adminId: number;
  private _notSelected = true;
  private _container: Component;

  constructor() {
    super(view);
  }

  connected() {
    this.addSubscriber(STATES.CHAT_MESSAGES, this._loadMessages);
    this.addSubscriber(NEW_MESSAGE, this._newMessage);
  }

  private _loadMessages = (messages: IChatMessageItem[] | string): void => {
    if (messages === "loading") {
      this.loading();
      this._notSelected = false;
    } else {
      if (State.extract(STATES.CURRENT_CHAT)) {
        this._notSelected = false;
      }
      this.messages = messages;
      // this._adminId = State.extract(ADMIN).id | null;
      this.render({
        messages: this.messages,
        notSelected: this._notSelected,
      });
      this.scrollTop = Math.round(Number.MAX_SAFE_INTEGER / 10);
      this._container = <Component>this.querySelector("#messages_container");
    }
  };

  private _newMessage = (message: IChatMessageItem): void => {
    if (message) {
      const tmp: Component = <Component>(
        document.createElement("chat-message-item")
      );
      if (this._container) {
        this._container.appendChild(tmp);
        tmp.props["message"] = message;
        this.scrollTop = Math.round(Number.MAX_SAFE_INTEGER / 10);
      }
    }
  };
}
