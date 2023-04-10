import view from "./ChatSending.hbs";
import { Component } from "../../../../../../core/Component";
import { Subscribe } from "../../../../../../core/State";

export class ChatSending extends Component {
  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.subscriber = Subscribe("currentChat", (val) => {
      if (val && val !== "loading") {
        this.render();
      } else {
        this.innerHTML = "";
      }
    });
  }
}
