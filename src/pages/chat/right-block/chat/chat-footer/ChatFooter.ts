import view from "./ChatFooter.hbs";
import { Component } from "../../../../../core/Component";
import { STATES } from "../../../../../core/ChatApp";
import "./ChatFooter.scss";

export class ChatFooter extends Component {
  message = "";

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
      this.getElementsByTagName("input")[0].focus();
    }
  };

  connected(): void {
    this.addSubscriber(STATES.CURRENT_CHAT, (val) => {
      if (val && val !== "loading") {
        this.style.display = "flex";
        this.render({ message: this.message });
        this.getElementsByTagName("input")[0].focus();
      } else {
        this.style.display = "none";
      }
    });
  }
}
