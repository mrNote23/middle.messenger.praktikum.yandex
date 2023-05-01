import view from "./LeftBlock.hbs";
import { Component } from "../../../core/Component";
import { LeftSearch } from "./left-search/LeftSearch";
import { LeftChatsList } from "./left-chats-list/LeftChatsList";
import { LeftUsersList } from "./left-users-list/LeftUsersList";
import { TSwitchRoute } from "../../../shared/content-switch/ContentSwitch";
import { LeftHeader } from "./left-header/LeftHeader";
import { STATES } from "../../../core/config/types";
import { leftRoutes } from "./leftRoutes";
import "./LeftBlock.scss";

customElements.define("left-header", LeftHeader);
customElements.define("left-search", LeftSearch);
customElements.define("left-chats-list", LeftChatsList);
customElements.define("left-users-list", LeftUsersList);

export class LeftBlock extends Component {
  private _router: Component;
  leftRoutes: TSwitchRoute[];

  constructor() {
    super(view);
    this.leftRoutes = leftRoutes;
  }

  connected() {
    this.render();
    this._router = <Component>document.getElementById("left-router");

    this.addSubscriber(STATES.LEFT_MODE, this._changedMode);
  }

  private _changedMode = (val: string) => (this._router.props.path = val);
}
