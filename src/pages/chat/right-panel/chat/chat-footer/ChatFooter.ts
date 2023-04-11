import view from "./ChatFooter.hbs";
import { Component } from "../../../../../core/Component";
import { Subscribe } from "../../../../../core/State";
import { STATES } from "../../../../../core/Chat";
import "./ChatFooter.scss";

export class ChatFooter extends Component {
  message: string = "";

  constructor() {
    super(view);
  }

  onChange = <T>(e: T): void => {
    this.message = e.target.value;
    e.key === "Enter" && this.sendMessage();
  };

  sendMessage = (): void => {
    if (this.message.length) {
      console.log(`Message: ${this.message}`);
      this.message = "";
      this.render();
    }
  };

  connectedCallback(): void {
    this.subscriber = Subscribe(STATES.CURRENT_CHAT, (val) => {
      if (val && val !== "loading") {
        this.style.display = "flex";
        this.render({ message: this.message });
      } else {
        this.style.display = "none";
      }
    });
  }
}
