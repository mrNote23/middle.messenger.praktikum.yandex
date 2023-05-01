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
  user: IUser;
  currentChat: IChat;

  constructor() {
    super(view);
  }

  connected(): void {
    this.addSubscriber(STATES.CURRENT_CHAT, this.changedChat);
    this.addSubscriber(STATES.CURRENT_USER, this.changedUser);
  }

  changedChat = (val: IChat) => (this.currentChat = val);

  changedUser = (val: IUser) => {
    this.user = val;
    if (this.user) {
      this.render({
        ...this.user,
        canDelete: this.user.id !== State.extract(ADMIN).id,
        chatTitle: this.currentChat.title,
        chatAvatar: this.currentChat.avatar,
      });
    }
  };

  backBtn = () => {
    OnMobile.showLeftPanel();
    Router.go(`/users/${this.currentChat.id}`);
  };

  deleteUser = (): void => {
    Confirm(
      { title: "Are you sure?", text: "Do you want to delete a user?" },
      () => {
        UserController.deleteUser(this.user.id);
        this.backBtn();
      }
    );
  };
}
