import view from "./UsersList.hbs";
import { Dispatch, Extract, Subscribe } from "../../../../../core/State.ts";
import { OnMobile } from "../../../../../utils/on-mobile";
import { Component } from "../../../../../core/Component";
import { IChatUsers } from "../../../../../core/interfaces";
import "./UsersList.scss";

export class UsersList extends Component {
  list: IChatUsers[] = [];
  rightMode: string | null = null;

  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.list = Extract("chatUsers");
    this.subscriber = Subscribe("rightMode", (val) => (this.rightMode = val));
    this.render({ list: this.list }, [
      { selector: "li.users-item", event: "click", cb: this.selectUser },
    ]);
  }

  selectUser = (e): void => {
    const item: Element = e.target.closest("li");
    const userId: string | null = item.id || null;
    if (userId && !item.classList.contains("active")) {
      Dispatch("currentUser", this.list[userId.split("-")[1]]);
      if (this.rightMode !== "userProfile") {
        Dispatch("rightMode", "userProfile");
        this.rightMode = "userProfile";
      }
      document
        .querySelectorAll("li.users-item.active")
        .forEach((elm) => elm.classList.remove("active"));
      item.classList.add("active");
    }

    OnMobile.showRightPanel();
  };
}
