import view from "./ChatHeader.hbs";
import State from "../../../../../core/State";
import { OnMobile } from "../../../../../utils/on-mobile";
import { Component } from "../../../../../core/Component";
import { IChat, IUser } from "../../../../../core/config/interfaces";
import "./ChatHeader.scss";
import { RIGHTMODE, STATES } from "../../../../../core/ChatApp";

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
  }

  chatChanged = (chat: IChat | "loading"): void => {
    if (chat === "loading") {
      this.loading();
    } else {
      this.chat = chat;
      this.usersAvatars = [];
      this.chatUsers = State.extract(STATES.CHAT_USERS);
      Object.values(this.chatUsers)
        .slice(0, 3)
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
    State.dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT_PROFILE);
  };
}
