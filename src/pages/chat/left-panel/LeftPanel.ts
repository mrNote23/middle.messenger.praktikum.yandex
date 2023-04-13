import view from "./LeftPanel.hbs";
import { Component } from "../../../core/Component";
import State from "../../../core/State";
import "./LeftPanel.scss";
import { LEFTMODE, STATES } from "../../../core/ChatApp";
import { HeaderComponent } from "./header-component/HeaderComponent";
import { SearchComponent } from "./search-component/SearchComponent";
import { ChatsList } from "./chats-list/ChatsList";
import { UsersList } from "./users-list/UsersList";

window.customElements.define("header-component", HeaderComponent);
window.customElements.define("search-component", SearchComponent);
window.customElements.define("chats-list", ChatsList);
window.customElements.define("users-list", UsersList);

export class LeftPanel extends Component {
  cnt = 0;

  constructor() {
    super(view);
    console.log(this.attributes);
  }

  public tick = () => {
    this.dispatchEvent(
      new CustomEvent("tick", { detail: `tick: ${this.cnt}` })
    );
    this.cnt++;
  };

  public ping = () => {
    this.dispatchEvent(
      new CustomEvent("ping", { detail: `ping: ${this.cnt}` })
    );
    this.cnt++;
  };

  public pong = () => {
    this.dispatchEvent(
      new CustomEvent("pong", { detail: `pong: ${this.cnt}` })
    );
    this.cnt++;
  };

  connectedCallback(): void {
    this.render();

    console.log(this);
    setInterval(() => {
      this.tick();
      this.ping();
      this.pong();
    }, 1000);

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
