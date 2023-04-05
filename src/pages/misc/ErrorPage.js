import view404 from "./404.hbs";
import view500 from "./500.hbs";
import { RenderTo } from "../../core/RenderTo.js";
import "./misc.css";

export class ErrorPage extends HTMLElement {
  constructor() {
    super();
    this.view = view404;
  }

  connectedCallback() {
    switch (this.textContent) {
      case "404":
        this.view = view404;
        break;
      default:
        this.view = view500;
    }
    RenderTo(this, this.view);
  }
}
