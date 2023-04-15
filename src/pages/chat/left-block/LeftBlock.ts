import view from "./LeftBlock.hbs";
import { Component } from "../../../core/Component";
import State from "../../../core/State";
import { LEFTMODE, STATES } from "../../../core/ChatApp";
import { HeaderComponent } from "./header-component/HeaderComponent";
import { SearchComponent } from "./search-component/SearchComponent";
import { ChatsList } from "./chats-list/ChatsList";
import { UsersList } from "./users-list/UsersList";
import "./LeftBlock.scss";

window.customElements.define("header-component", HeaderComponent);
window.customElements.define("search-component", SearchComponent);
window.customElements.define("chats-list", ChatsList);
window.customElements.define("users-list", UsersList);

export class LeftBlock extends Component {
  cnt = 0;

  constructor() {
    super(view);
  }

  connected(): void {
    this.render();

    this.subscriber = State.subscribe(STATES.LEFT_MODE, (val) => {
      if (val === LEFTMODE.CHATS) {
        document.getElementById("left-container").innerHTML =
          "<chats-list class='sidebar-body' id='chats-list'></chats-list>";
      } else {
        document.getElementById("left-container").innerHTML =
          "<users-list class='sidebar-body' id='users-list'></users-list>";
      }
    });
  }
}