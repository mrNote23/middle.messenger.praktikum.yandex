import view from "./UserProfile.hbs";
import State from "../../../../../core/State";
import { Confirm } from "../../../../../shared/confirm/confirm";
import "./UserProfile.scss";
import { Component } from "../../../../../core/Component";
import { IChat, IUser } from "../../../../../core/config/interfaces";
import ChatApp, { ADMIN, RIGHTMODE, STATES } from "../../../../../core/ChatApp";

export class UserProfile extends Component {
  user: IUser;
  currentChat: IChat;

  constructor() {
    super(view);
  }

  connected(): void {
    this.addSubscriber(STATES.CURRENT_CHAT, (val) => (this.currentChat = val));
    this.addSubscriber(STATES.CURRENT_USER, (val: IUser) => {
      this.user = val;
      this.render({
        ...this.user,
        canDelete: this.user.id !== State.extract(ADMIN).id,
        chatTitle: this.currentChat.title,
        chatAvatar: this.currentChat.avatar,
      });
    });
  }

  backBtn = () => {
    State.dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT);
  };

  deleteUser = (): void => {
    Confirm(
      { title: "Are you sure?", text: "Do you want to delete a user?" },
      () => {
        ChatApp.deleteUser(this.user.id);
        this.backBtn();
      }
    );
  };
}
