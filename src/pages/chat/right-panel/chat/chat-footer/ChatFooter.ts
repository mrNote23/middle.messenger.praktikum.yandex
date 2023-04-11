import view from "./ChatFooter.hbs";
import { Component } from "../../../../../core/Component";
import { Subscribe } from "../../../../../core/State";
import { STATES } from "../../../../../core/Chat";

export class ChatFooter extends Component {
  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.subscriber = Subscribe(STATES.CURRENT_CHAT, (val) => {
      if (val && val !== "loading") {
        this.render();
      } else {
        this.innerHTML = "";
      }
    });
  }
}
