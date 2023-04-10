import view from "./UsersList.hbs";
import { Extract } from "../../../../../core/State.ts";
import { Component } from "../../../../../core/Component";
import { IChatUsers } from "../../../../../core/interfaces";
import Chat from "../../../../../core/Chat";
import "./UsersList.scss";

export class UsersList extends Component {
  usersList: IChatUsers[] = [];

  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.usersList = Extract("chatUsers");
    this.render({ list: this.usersList }, [
      { selector: "li.users-item", event: "click", cb: this.selectUser },
    ]);
  }

  // выбор пользователя (клик по списку)
  selectUser = <T>(e: T): void => {
    const item: Element = e.target.closest("li");
    const userId: string | null = item.id || null;
    if (userId && !item.classList.contains("active")) {
      Chat.setCurrentUser(this.usersList[userId.split("-")[1]]);
      document
        .querySelectorAll("li.users-item.active")
        .forEach((elm) => elm.classList.remove("active"));
      item.classList.add("active");
    }
  };
}
