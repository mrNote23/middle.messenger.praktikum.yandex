import view from "./ChatPage.hbs";
import { Component } from "../../core/Component";
import "./ChatPage.scss";

export class ChatPage extends Component {
  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.render();
  }
}
