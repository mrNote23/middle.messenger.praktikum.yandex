import view from "./LeftPanel.hbs";
import { Component } from "../../../core/Component";
import { Subscribe } from "../../../core/State";
import "./LeftPanel.scss";
import { LEFTMODE, STATES } from "../../../core/Chat";

export class LeftPanel extends Component {
  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.render();
    this.subscriber = Subscribe(STATES.LEFT_MODE, (val) => {
      if (val === LEFTMODE.CHATS) {
        document.getElementById(
          "left-container"
        ).innerHTML = `<chats-list class="sidebar-body" id="chats-list"></chats-list>`;
      } else {
        document.getElementById(
          "left-container"
        ).innerHTML = `<users-list class="sidebar-body" id="users-list"></users-list>`;
      }
    });
  }
}
