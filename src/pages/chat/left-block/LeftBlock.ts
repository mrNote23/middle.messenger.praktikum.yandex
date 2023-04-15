import view from "./LeftBlock.hbs";
import { Component } from "../../../core/Component";
import State from "../../../core/State";
import { STATES } from "../../../core/ChatApp";
import { LeftSearch } from "./left-search/LeftSearch";
import { LeftChatsList } from "./left-chats-list/LeftChatsList";
import { LeftUsersList } from "./left-users-list/LeftUsersList";
import { TRoute } from "../../../shared/router-component/RouterComponent";
import { leftRoutes } from "./leftRoutes";
import { LeftHeader } from "./left-header/LeftHeader";
import "./LeftBlock.scss";

window.customElements.define("left-header", LeftHeader);
window.customElements.define("left-search", LeftSearch);
window.customElements.define("left-chats-list", LeftChatsList);
window.customElements.define("left-users-list", LeftUsersList);

export class LeftBlock extends Component {
  router: HTMLElement;
  leftRoutes: TRoute[];

  constructor() {
    super(view);
    this.leftRoutes = leftRoutes;
  }

  connected(): void {
    this.render();
    this.router = document.getElementById("left-router");

    this.subscriber = State.subscribe(STATES.LEFT_MODE, (val) => {
      this.router.setAttribute("path", val);
    });
  }
}
