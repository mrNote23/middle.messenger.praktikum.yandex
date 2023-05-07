import view from "./UserProfile.hbs";
import State from "../../../../../core/State";
import { Confirm } from "../../../../../shared/confirm/confirm";
import { Component } from "../../../../../core/Component";
import { IChat, IUser } from "../../../../../core/config/interfaces";
import { UserController } from "../../../../../core/controllers/UserController";
import { ADMIN, STATES } from "../../../../../core/config/types";
import Router from "../../../../../core/Router";
import { OnMobile } from "../../../../../utils/on-mobile";
import "./UserProfile.scss";

export class UserProfile extends Component {
  private _user: IUser;
  private _currentChat: IChat;

  constructor() {
    super(view);
  }

  connected(): void {
    this.addSubscriber(STATES.CURRENT_CHAT, this._changedChat);
    this.addSubscriber(STATES.CURRENT_USER, this._changedUser);
  }

  private _changedChat = (val: IChat) => (this._currentChat = val);

  private _changedUser = (val: IUser): void => {
    this._user = val;
    if (this._user) {
      this.render({
        ...this._user,
        canDelete: this._user.id !== (State.extract(ADMIN) as IUser).id,
        chatTitle: this._currentChat.title,
        chatAvatar: this._currentChat.avatar,
      });
    }
  };

  backBtn = (): void => {
    OnMobile.showLeftPanel();
    Router.go(`/users/${this._currentChat.id}`);
  };

  deleteUser = (): void => {
    Confirm(
      { title: "Are you sure?", text: "Do you want to delete a user?" },
      () => {
        UserController.deleteUser(this._user.id);
        this.backBtn();
      }
    );
  };
}
