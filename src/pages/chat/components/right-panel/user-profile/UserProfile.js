import view from "./UserProfile.hbs";
import { Dispatch, Subscribe, UnSubscribe } from "../../../../../core/State.js";
import { RenderTo } from "../../../../../core/RenderTo.js";
import { Confirm } from "../../../../../ui/confirm/confirm.js";
import "./UserProfile.scss";

export class UserProfile extends HTMLElement {
  constructor() {
    super();
    this.subscriptions = [];
  }

  connectedCallback() {
    this.subscriptions.push(
      Subscribe("currentUser", (val) => {
        this.user = val;
        RenderTo(this, view, { ...this.user }, [
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
      })
    );
  }

  disconnectedCallback() {
    this.subscriptions.forEach((elm) => UnSubscribe(elm));
  }

  deleteUser = () => {
    Confirm(
      { title: "Are you sure?", text: "Do you want to delete a user?" },
      () => {}
    );
  };
}
