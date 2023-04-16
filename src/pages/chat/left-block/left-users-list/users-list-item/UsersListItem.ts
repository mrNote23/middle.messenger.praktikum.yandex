import { Component, TProps } from "../../../../../core/Component";
import view from "./UsersListItem.hbs";
import { IUser } from "../../../../../core/config/interfaces";
import { STATES } from "../../../../../core/ChatApp";
import State from "../../../../../core/State";

export class UsersListItem extends Component {
  user: IUser;

  constructor() {
    super(view);
  }

  connected() {
    this.getProps.then((props: TProps) => {
      this.user = props.user;
      this.render(this.user);

      this.onclick = (e: MouseEvent) => {
        e.preventDefault();
        this.createEvent("select", this.user.id);
      };
      this.subscriber = State.subscribe(STATES.CURRENT_USER, this.onChangeUser);
    });
  }

  onChangeUser = (user: IUser) => {
    if (user instanceof Object) {
      if (this.user.id === user.id) {
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
