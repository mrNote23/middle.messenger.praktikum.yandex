import view from "./UserProfile.hbs";
import { Dispatch, Subscribe } from "../../../../../core/State.ts";
import { Confirm } from "../../../../../ui/confirm/confirm";
import "./UserProfile.scss";
import { Component } from "../../../../../core/Component";
import { IUser } from "../../../../../core/interfaces";

export class UserProfile extends Component {
  user: IUser;

  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.subscriber = Subscribe("currentUser", (val) => {
      this.user = val;
      this.render({ ...this.user }, [
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
      ]);
    });
  }

  deleteUser = (): void => {
    Confirm(
      { title: "Are you sure?", text: "Do you want to delete a user?" },
      () => {}
    );
  };
}
