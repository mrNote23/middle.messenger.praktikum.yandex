import view from "./LeftUsersList.hbs";
import State from "../../../../core/State";
import { Component } from "../../../../core/Component";
import { IChatUsers } from "../../../../core/config/interfaces";
import ChatApp, { STATES } from "../../../../core/ChatApp";
import "./LeftUsersList.scss";
import { UsersListItem } from "./users-list-item/UsersListItem";

window.customElements.define("users-list-item", UsersListItem);

export class LeftUsersList extends Component {
  usersList: IChatUsers;

  constructor() {
    super(view);
  }

  connected(): void {
    this.usersList = State.extract(STATES.CHAT_USERS);
    this.render({ list: this.usersList });
  }

  selectUser(id) {
    ChatApp.setCurrentUser(this.usersList[id]);
  }
}
