import view from "./ChatCurrent.hbs";
import { Dispatch, Subscribe } from "../../../../../../core/State.ts";
import { OnMobile } from "../../../../../../utils/on-mobile";
import "./ChatCurrent.scss";
import { Component } from "../../../../../../core/Component";
import { IChat, IUser } from "../../../../../../core/interfaces";

export class ChatCurrent extends Component {
  chat: IChat | null = null;
  usersAvatars: Array<string>;
  usersCountAvatar: number | string = 0;
  chatUsers: IUser[] = [];

  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.chat = null;
    this.usersAvatars = [];
    this.usersCountAvatar = 0;
    this.chatUsers = [];

    this.subscriber = Subscribe("chatUsers", (val) => {
      this.chatUsers = val;
      this.changeChat(this.chat);
    });
    this.subscriber = Subscribe("currentChat", this.changeChat);
  }

  changeChat = (chat: IChat | null): void => {
    this.chat = chat;
    this.usersAvatars = [];

    Object.values(this.chatUsers)
      .slice(3)
      .forEach((u) => this.usersAvatars.push(u.avatar));
    this.usersCountAvatar =
      Object.keys(this.chatUsers).length < 10
        ? Object.keys(this.chatUsers).length
        : "99+";
    this.render(
      {
        ...this.chat,
        usersAvatars: this.usersAvatars,
        usersCountAvatar: this.usersCountAvatar,
        showAvatars: this.usersAvatars.length > 0,
      },
      [
        { selector: "#back", event: "click", cb: OnMobile.showLeftPanel },
        {
          selector: "#chat-profile-btn",
          event: "click",
          cb: this.openChatProfile,
        },
      ]
    );
  };

  openChatProfile = (): void => {
    Dispatch("rightMode", "chatProfile");
  };
}
