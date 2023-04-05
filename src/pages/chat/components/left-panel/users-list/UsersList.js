import view from "./UsersList.hbs";
import {
  Dispatch,
  Extract,
  Subscribe,
  UnSubscribe,
} from "../../../../../core/State.js";
import { RenderTo } from "../../../../../core/RenderTo.js";
import "./UsersList.scss";
import { OnMobile } from "../../../../../utils/on-mobile.js";

export class UsersList extends HTMLElement {
  constructor() {
    super();
    this.subscriptions = [];
  }

  connectedCallback() {
    this.list = Extract("chatUsers");
    this.subscriptions.push(
      Subscribe("rightMode", (val) => (this.rightMode = val))
    );
    RenderTo(this, view, { list: this.list }, [
      { selector: "li.users-item", event: "click", cb: this.selectUser },
    ]);
  }

  disconnectedCallback() {
    this.subscriptions.forEach((elm) => UnSubscribe(elm));
  }

  selectUser = (e) => {
    const item = e.target.closest("li");
    const userId = item.id || null;
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
