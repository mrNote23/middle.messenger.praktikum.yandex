import { Component } from "../../../../../core/Component";
import view from "./UsersListItem.hbs";
import { IUser } from "../../../../../core/config/interfaces";
import State from "../../../../../core/State";
import { STATES } from "../../../../../core/config/types";

export class UsersListItem extends Component {
  user: IUser;

  constructor() {
    super(view);
  }

  propsChanged() {
    if (this.props) {
      this.render(<IUser>this.props.user);
      this.onChangeUser(<IUser>State.extract(STATES.CURRENT_USER));
    }
  }

  connected() {
    this.onclick = (e: MouseEvent) => {
      e.preventDefault();
      this.createEvent("select", this.props.user.id);
    };
    this.addSubscriber(STATES.CURRENT_USER, this.onChangeUser);
    // });
  }

  onChangeUser = (user: IUser) => {
    if (user instanceof Object && this.props.user) {
      if (this.props.user.id === user.id) {
        this.classList.add("active");
      } else {
        this.classList.remove("active");
      }
    }
  };

  disconnected() {
    this.onclick = null;
  }
}
