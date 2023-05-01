import view from "./LeftUsersList.hbs";
import { Component } from "../../../../core/Component";
import { IChatUsers } from "../../../../core/config/interfaces";
import "./LeftUsersList.scss";
import { UsersListItem } from "./users-list-item/UsersListItem";
import { STATES } from "../../../../core/config/types";
import Router from "../../../../core/Router";
import State from "../../../../core/State";

customElements.define("users-list-item", UsersListItem);

export class LeftUsersList extends Component {
  usersList: IChatUsers;

  constructor() {
    super(view);
  }

  connected(): void {
    this.addSubscriber(STATES.CHAT_USERS, this.changedUsers);
  }

  changedUsers = (val: IChatUsers) => {
    this.usersList = val;
    this.render({ list: this.usersList });
  };

  selectUser = (id) => {
    Router.go(`/user/${State.extract(STATES.CURRENT_CHAT).id}/${id.detail}`);
  };
}
