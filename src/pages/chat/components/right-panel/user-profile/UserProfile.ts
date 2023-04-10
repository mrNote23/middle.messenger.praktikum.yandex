import view from "./UserProfile.hbs";
import { Dispatch, Subscribe } from "../../../../../core/State.ts";
import { Confirm } from "../../../../../ui/confirm/confirm";
import "./UserProfile.scss";
import { Component } from "../../../../../core/Component";
import { IChat, IUser } from "../../../../../core/interfaces";

export class UserProfile extends Component {
  user: IUser;
  currentChat: IChat;

  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.subscriber = Subscribe(
      "currentChat",
      (val) => (this.currentChat = val)
    );
    this.subscriber = Subscribe("currentUser", (val) => {
      this.user = val;
      this.render(
        {
          ...this.user,
          chatTitle: this.currentChat.title,
          chatAvatar: this.currentChat.avatar,
        },
        [
          {
            selector: "#back",
            event: "click",
            cb: () => {
              Dispatch("rightMode", "chat");
            },
          },
          {
            selector: "#user-delete",
            event: "click",
            cb: this.deleteUser,
          },
        ]
      );
    });
  }

  deleteUser = (): void => {
    Confirm(
      { title: "Are you sure?", text: "Do you want to delete a user?" },
      () => {}
    );
  };
}
