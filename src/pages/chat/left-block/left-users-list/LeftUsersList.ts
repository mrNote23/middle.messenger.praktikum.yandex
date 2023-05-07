import view from "./LeftUsersList.hbs";
import { Component } from "../../../../core/Component";
import { IChat, IChatUsers } from "../../../../core/config/interfaces";
import { UsersListItem } from "./users-list-item/UsersListItem";
import { STATES } from "../../../../core/config/types";
import Router from "../../../../core/Router";
import State from "../../../../core/State";
import "./LeftUsersList.scss";

customElements.define("users-list-item", UsersListItem);

export class LeftUsersList extends Component {
  usersList: IChatUsers;

  constructor() {
    super(view);
  }

  connected() {
    this.addSubscriber(STATES.CHAT_USERS, this._changedUsers);
  }

  private _changedUsers = (val: IChatUsers): void => {
    this.usersList = val;
    this.render({ list: this.usersList });
  };

  selectUser = (id: CustomEvent) => {
    Router.go(
      `/user/${(State.extract(STATES.CURRENT_CHAT) as IChat).id}/${id.detail}`
    );
  };
}
