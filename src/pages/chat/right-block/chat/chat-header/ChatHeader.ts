import view from "./ChatHeader.hbs";
import State from "../../../../../core/State";
import { OnMobile } from "../../../../../utils/on-mobile";
import { Component } from "../../../../../core/Component";
import { IChat, IUser } from "../../../../../core/config/interfaces";
import "./ChatHeader.scss";
import { STATES } from "../../../../../core/config/types";
import Router from "../../../../../core/Router";

export class ChatHeader extends Component {
  chat: IChat | null = null;
  usersAvatars: Array<string>;
  usersCountAvatar: number | string = 0;
  chatUsers: IUser[] | null = null;

  constructor() {
    super(view);
  }

  connected(): void {
    this.chat = null;
    this.usersAvatars = [];
    this.usersCountAvatar = 0;
    this.chatUsers = [];

    this.addSubscriber(STATES.CURRENT_CHAT, this.chatChanged);
    this.addSubscriber(STATES.CHAT_USERS, this.usersChanged);
  }

  usersChanged = (users: IUser[]) => {
    this.chatUsers = users;
    this.chatChanged(<IChat>this.chat);
  };

  chatChanged = (chat: IChat | "loading"): void => {
    if (chat === "loading") {
      this.loading();
    } else {
      this.chat = chat;
      if (this.chat) {
        this.usersAvatars = [];
        this.chatUsers = <IUser[]>State.extract(STATES.CHAT_USERS);
        Object.values(this.chatUsers)
          .slice(0, 3)
          .forEach((u) => this.usersAvatars.push(u.avatar));
        this.usersCountAvatar =
          Object.keys(this.chatUsers).length < 10
            ? Object.keys(this.chatUsers).length
            : "10+";
        this.render({
          ...this.chat,
          usersAvatars: this.usersAvatars,
          usersCountAvatar: this.usersCountAvatar,
          showAvatars: this.usersAvatars.length > 0,
        });
      } else {
        this.render();
      }
    }
  };

  showLeftPanel = () => {
    OnMobile.showLeftPanel();
  };

  openChatProfile = (): void => {
    Router.go(`/chat-profile/${State.extract(STATES.CURRENT_CHAT).id}`);
  };
}
