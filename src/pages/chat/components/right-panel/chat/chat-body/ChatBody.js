import view from "./ChatBody.hbs";
import { RenderTo } from "../../../../../../core/RenderTo.js";
import Api from "../../../../../../core/Api.js";
import {
  Dispatch,
  Extract,
  Subscribe,
  UnSubscribe,
} from "../../../../../../core/State.js";
import "./ChatBody.scss";

export class ChatBody extends HTMLElement {
  constructor() {
    super();
    this.subscriptions = [];
  }

  connectedCallback() {
    this.chat = null;
    this.chatUsers = [];
    this.admin = Extract("admin");
    this.subscriptions.push(Subscribe("currentChat", this.changeChat));
  }

  disconnectedCallback() {
    this.subscriptions.forEach((elm) => UnSubscribe(elm));
  }

  changeChat = (chat) => {
    if (chat) {
      this.innerHTML = '<div class="loader">Loading...</div>';
      this.fetchMessages(chat.id);
    } else {
      this.render();
    }
  };

  render = () => {
    RenderTo(this, view, {
      chat: this.chat,
      adminId: this.admin.id,
      notSelected: !this.chat,
    });
  };

  prepareUsers = (users) => {
    const res = {};
    users.forEach((user) => (res[user.id] = user));
    return res;
  };

  prepareMessages = (messages) => {
    return messages.map((elm) => {
      elm.display_name = this.chatUsers[elm.user_id].display_name;
      elm.avatar = this.chatUsers[elm.user_id].avatar;
      return elm;
    });
  };
  fetchMessages = (chatId) => {
    Promise.all([Api.getChatMessages(chatId), Api.getChatUsers(chatId)]).then(
      (values) => {
        this.chatUsers = this.prepareUsers(values[1]);
        this.chat = this.prepareMessages(values[0]);
        Dispatch("chatUsers", this.chatUsers);
        this.render();
      }
    );
  };
}
