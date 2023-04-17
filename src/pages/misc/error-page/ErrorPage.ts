import view404 from "./404.hbs";
import view500 from "./500.hbs";
import { Component } from "../../../core/Component";
import "../misc.scss";

export class ErrorPage extends Component {
  constructor() {
    super(view404);
  }

  connected(): void {
    switch (this.textContent) {
      case "404":
        this.view = view404;
        break;
      default:
        this.view = view500;
    }
    this.render();
  }
}
