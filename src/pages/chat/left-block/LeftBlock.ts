import view from "./LeftBlock.hbs";
import { Component } from "../../../core/Component";
import { LeftSearch } from "./left-search/LeftSearch";
import { LeftChatsList } from "./left-chats-list/LeftChatsList";
import { LeftUsersList } from "./left-users-list/LeftUsersList";
import { TRoute } from "../../../shared/content-switch/ContentSwitch";
import { LeftHeader } from "./left-header/LeftHeader";
import { STATES } from "../../../core/config/types";
import { leftRoutes } from "./leftRoutes";
import "./LeftBlock.scss";

customElements.define("left-header", LeftHeader);
customElements.define("left-search", LeftSearch);
customElements.define("left-chats-list", LeftChatsList);
customElements.define("left-users-list", LeftUsersList);

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

    this.addSubscriber(STATES.LEFT_MODE, this.changedMode);
  }

  changedMode = (val: string) => (this.router.props.path = val);
}
