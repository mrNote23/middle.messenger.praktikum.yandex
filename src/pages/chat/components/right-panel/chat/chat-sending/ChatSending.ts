import view from "./ChatSending.hbs";
import { Component } from "../../../../../../core/Component";
import "./ChatSending.scss";

export class ChatSending extends Component {
  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.render();
  }
}
