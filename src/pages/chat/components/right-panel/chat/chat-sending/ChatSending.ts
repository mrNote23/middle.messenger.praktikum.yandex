import view from "./ChatSending.hbs";
import { Component } from "../../../../../../core/Component";
import { Subscribe } from "../../../../../../core/State";
import { STATES } from "../../../../../../core/Chat";

export class ChatSending extends Component {
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
