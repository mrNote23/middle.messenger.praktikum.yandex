import { Component } from "../../core/Component";
import Router from "../../core/Router";

export class RouterLink extends Component {
  constructor() {
    super();
  }

  connected() {
    this.render();
    this.addEventListener("click", this.onClick);
  }

  onClick = (e: MouseEvent): void => {
    e.stopPropagation();
    Router.go(this.getAttribute("href"));
  };

  disconnected(): void {
    this.removeEventListener("click", this.onClick);
  }
}
