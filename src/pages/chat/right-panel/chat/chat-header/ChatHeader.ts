import view from "./ChatHeader.hbs";
import { Dispatch, Extract, Subscribe } from "../../../../../core/State.ts";
import { OnMobile } from "../../../../../utils/on-mobile";
import { Component } from "../../../../../core/Component";
import { IChat, IUser } from "../../../../../core/interfaces";
import "./ChatHeader.scss";
import { RIGHTMODE, STATES } from "../../../../../core/Chat";

export class ChatHeader extends Component {
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

    this.subscriber = Subscribe(STATES.CURRENT_CHAT, this.chatChanged);
  }

  chatChanged = (chat: IChat | "loading"): void => {
    if (chat === "loading") {
      this.loading();
    } else {
      this.chat = chat;
      this.usersAvatars = [];
      this.chatUsers = Extract(STATES.CHAT_USERS);
      Object.values(this.chatUsers)
        .slice(3)
        .forEach((u) => this.usersAvatars.push(u.avatar));
      this.usersCountAvatar =
        Object.keys(this.chatUsers).length < 10
          ? Object.keys(this.chatUsers).length
          : "99+";
      this.render({
        ...this.chat,
        usersAvatars: this.usersAvatars,
        usersCountAvatar: this.usersCountAvatar,
        showAvatars: this.usersAvatars.length > 0,
      });
    }
  };

  showLeftPanel = () => {
    OnMobile.showLeftPanel();
  };

  openChatProfile = (): void => {
    Dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT_PROFILE);
  };
}
