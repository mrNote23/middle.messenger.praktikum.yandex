import view from "./ChatHeader.hbs";
import State from "../../../../../core/State";
import { OnMobile } from "../../../../../utils/on-mobile";
import { Component } from "../../../../../core/Component";
import { IChat, IUser } from "../../../../../core/config/interfaces";
import { STATES } from "../../../../../core/config/types";
import Router from "../../../../../core/Router";
import "./ChatHeader.scss";

export class ChatHeader extends Component {
  private _chat: IChat | null = null;
  private _usersAvatars: Array<string>;
  private _usersCountAvatar: number | string = 0;
  private _chatUsers: IUser[] | null = null;

  constructor() {
    super(view);
  }

  connected() {
    this._chat = null;
    this._usersAvatars = [];
    this._usersCountAvatar = 0;
    this._chatUsers = [];

    this.addSubscriber(STATES.CURRENT_CHAT, this._chatChanged);
    this.addSubscriber(STATES.CHAT_USERS, this._usersChanged);
  }

  private _usersChanged = (users: IUser[]): void => {
    this._chatUsers = users;
    this._chatChanged(<IChat>this._chat);
  };

  private _chatChanged = (chat: IChat | string): void => {
    if (chat === "loading") {
      this.loading();
    } else {
      this._chat = <IChat>chat;
      if (this._chat) {
        this._usersAvatars = [];
        this._chatUsers = <IUser[]>State.extract(STATES.CHAT_USERS);
        Object.values(this._chatUsers)
          .slice(0, 3)
          .forEach((u) => this._usersAvatars.push(u.avatar));
        this._usersCountAvatar =
          Object.keys(this._chatUsers).length < 10
            ? Object.keys(this._chatUsers).length
            : "10+";
        this.render({
          ...this._chat,
          usersAvatars: this._usersAvatars,
          usersCountAvatar: this._usersCountAvatar,
          showAvatars: this._usersAvatars.length > 0,
        });
      } else {
        this.render();
      }
    }
  };

  showLeftPanel = (): void => {
    OnMobile.showLeftPanel();
  };

  openChatProfile = (): void => {
    Router.go(
      `/chat-profile/${(State.extract(STATES.CURRENT_CHAT) as IChat).id}`
    );
  };
}
