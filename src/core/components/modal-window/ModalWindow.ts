import view from "./ModalWindow.hbs";
import { Component } from "../../Component";
import "./ModalWindow.scss";

export class ModalWindow {
  node: HTMLElement;

  constructor(title: string, content: string = "") {
    this.node = document.createElement("modal-window");
    this.node.title = title;
    this.node.innerHTML = content;
    document.body.appendChild(this.node);
  }

  remove() {
    this.node.remove();
  }
}

export class ModalWindowComponent extends Component {
  constructor() {
    super(view);
  }

  connectedCallback() {
    this.render(
      {
        title: this.getAttribute("title"),
        content: this.innerHTML,
      },
      [
        { selector: document, event: "keyup", cb: this.pressEscape },
        { selector: ".modal-content", event: "click", cb: this.clickAway },
        { selector: ".close-modal", event: "click", cb: this.closeModal },
      ]
    );
  }

  clickAway = (e: MouseEvent): void => {
    if (e?.target["className"] === "modal-content") {
      this.remove();
    }
  };

  pressEscape = (e: KeyboardEvent): void => {
    if (e?.key === "Escape") {
      this.remove();
    }
  };

  closeModal = (e: MouseEvent): void => {
    if (e?.target["closest"](".close-modal")) {
      this.remove();
    }
  };
}
