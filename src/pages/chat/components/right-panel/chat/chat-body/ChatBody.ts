import view from "./ChatBody.hbs";
import Api from "../../../../../../core/Api.ts";
import { Dispatch, Extract, Subscribe } from "../../../../../../core/State.ts";
import "./ChatBody.scss";
import { Component } from "../../../../../../core/Component";
import {
  IChat,
  IChatMessage,
  IChatUsers,
} from "../../../../../../core/interfaces";

export class ChatBody extends Component {
  chat: Array<{}> | null = null;
  chatUsers: {};
  admin: object;

  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.chat = null;
    this.chatUsers = [];
    this.admin = Extract("admin");
    this.subscriber = Subscribe("currentChat", this.changeChat);
  }

  changeChat = (chat: IChat): void => {
    console.log(chat);
    if (chat) {
      this.loading();
      this.fetchMessages(chat.id);
    } else {
      this._render();
    }
  };

  _render = () => {
    this.render({
      chat: this.chat,
      adminId: this.admin.id,
      notSelected: !this.chat,
    });
  };

  prepareUsers = (users: Awaited<IChatMessage[] | IChatUsers[]>): {} => {
    const res = {};
    users.forEach((user) => (res[user["id"]] = user));
    return res;
  };

  prepareMessages = (
    messages: Awaited<IChatMessage[] | IChatUsers[]>
  ): Array<{}> => {
    return messages.map((elm) => {
      elm["display_name"] = this.chatUsers[elm["user_id"]].display_name;
      elm["avatar"] = this.chatUsers[elm["user_id"]].avatar;
      return elm;
    });
  };
  fetchMessages = (chatId: number): void => {
    Promise.all([Api.getChatMessages(chatId), Api.getChatUsers(chatId)]).then(
      (values) => {
        this.chatUsers = this.prepareUsers(values[1]);
        this.chat = this.prepareMessages(values[0]);
        Dispatch("chatUsers", this.chatUsers);
        this._render();
      }
    );
  };
}
