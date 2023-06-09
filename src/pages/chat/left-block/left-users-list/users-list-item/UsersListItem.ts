import { Component } from "../../../../../core/Component";
import view from "./UsersListItem.hbs";
import { IUser } from "../../../../../core/config/interfaces";
import State from "../../../../../core/State";
import { STATES, TRecord } from "../../../../../core/config/types";

export class UsersListItem extends Component {
  constructor() {
    super(view);
  }

  propsChanged() {
    if (this.props) {
      this.render(this.props.user as TRecord);
      this._onChangeUser(State.extract(STATES.CURRENT_USER) as IUser);
    }
  }

  connected() {
    this.onclick = (e: MouseEvent): void => {
      e.preventDefault();
      this.createEvent("select", (this.props.user as IUser).id);
    };
    this.addSubscriber(STATES.CURRENT_USER, this._onChangeUser);
  }

  private _onChangeUser = (user: IUser): void => {
    if (user instanceof Object && this.props.user) {
      if ((this.props.user as IUser).id === user.id) {
        this.classList.add("active");
      } else {
        this.classList.remove("active");
      }
    } else {
      this.classList.remove("active");
    }
  };

  disconnected() {
    this.onclick = null;
  }
}
