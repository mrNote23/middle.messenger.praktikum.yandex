import view from "./UserProfile.hbs";
import { Dispatch, Subscribe } from "../../../../core/State.ts";
import { Confirm } from "../../../../ui/confirm/confirm";
import "./UserProfile.scss";
import { Component } from "../../../../core/Component";
import { IChat, IUser } from "../../../../core/interfaces";
import { RIGHTMODE, STATES } from "../../../../core/Chat";

export class UserProfile extends Component {
  user: IUser;
  currentChat: IChat;

  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.subscriber = Subscribe(
      STATES.CURRENT_CHAT,
      (val) => (this.currentChat = val)
    );
    this.subscriber = Subscribe(STATES.CURRENT_USER, (val) => {
      this.user = val;
      this.render({
        ...this.user,
        chatTitle: this.currentChat.title,
        chatAvatar: this.currentChat.avatar,
      });
    });
  }

  backBtn = () => {
    Dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT);
  };

  deleteUser = (): void => {
    Confirm(
      { title: "Are you sure?", text: "Do you want to delete a user?" },
      () => {}
    );
  };
}
