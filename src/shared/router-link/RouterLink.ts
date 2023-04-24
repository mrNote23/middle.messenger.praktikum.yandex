import { Component } from "../../core/Component";
import ChatApp from "../../core/ChatApp";

export class RouterLink extends Component {
  constructor() {
    super();
  }

  connected() {
    this.render();
    this.addEventListener("click", this.onClick);
  }

  onClick = (e) => {
    e.stopPropagation();
    ChatApp.navigate(this.getAttribute("href"));
  };

  disconnected() {
    this.removeEventListener("click", this.onClick);
  }
}
