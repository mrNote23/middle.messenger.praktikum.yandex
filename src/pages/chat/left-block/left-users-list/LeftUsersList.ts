import view from "./LeftUsersList.hbs";
import { Component } from "../../../../core/Component";
import { IChatUsers } from "../../../../core/config/interfaces";
import "./LeftUsersList.scss";
import { UsersListItem } from "./users-list-item/UsersListItem";
import { UserController } from "../../../../core/controllers/UserController";
import { STATES } from "../../../../core/config/types";

customElements.define("users-list-item", UsersListItem);

export class LeftUsersList extends Component {
  usersList: IChatUsers;

  constructor() {
    super(view);
  }

  connected(): void {
    this.addSubscriber(STATES.CHAT_USERS, (val: IChatUsers) => {
      this.usersList = val;
      this.render({ list: this.usersList });
    });
    // this.usersList = State.extract(STATES.CHAT_USERS);
  }

  selectUser = (id) => {
    UserController.setCurrentUser(this.usersList[id.detail]);
  };
}
