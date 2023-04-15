import view from "./LeftUsersList.hbs";
import State from "../../../../core/State";
import { Component } from "../../../../core/Component";
import { IChatUsers } from "../../../../core/config/interfaces";
import Chat, { STATES } from "../../../../core/ChatApp";
import "./LeftUsersList.scss";

export class LeftUsersList extends Component {
  usersList: IChatUsers[] | null = [];

  constructor() {
    super(view);
  }

  connected(): void {
    this.usersList = State.extract(STATES.CHAT_USERS);
    this.render({ list: this.usersList });
  }

  // выбор пользователя (клик по списку)
  selectUser = <T>(e: T): void => {
    const item: Element = e.target.closest("li");
    const userId: string | null = item.id || null;
    if (userId && !item.classList.contains("active")) {
      if (this.usersList) {
        Chat.setCurrentUser(this.usersList[userId.split("-")[1]]);
      }
      document
        .querySelectorAll("li.users-item.active")
        .forEach((elm) => elm.classList.remove("active"));
      item.classList.add("active");
    }
  };
}
