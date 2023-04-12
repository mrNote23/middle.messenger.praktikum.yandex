import view from "./ChatPage.hbs";
import { Component } from "../../core/Component";
import State from "../../core/State";
import ChatApp, { ADMIN } from "../../core/ChatApp";
import "./ChatPage.scss";
import { LeftPanel } from "./left-panel/LeftPanel";
import { RightPanel } from "./right-panel/RightPanel";

window.customElements.define("left-panel", LeftPanel);
window.customElements.define("right-panel", RightPanel);

export class ChatPage extends Component {
  constructor() {
    super(view);
  }

  connectedCallback(): void {
    if (!State.extract(ADMIN)) {
      setTimeout(() => {
        ChatApp.navigate("/login");
      }, 0);
    } else {
      this.render();
    }
  }
}
