import view from "./ModalWindow.hbs";
import { Component } from "../../core/Component";
import "./ModalWindow.scss";

export class ModalWindow {
  node: HTMLElement;

  constructor(title = "", content = "", args: object | null = null) {
    this.node = document.createElement("modal-window");
    this.node.title = title;
    this.node.innerHTML = content;
    if (args) {
      for (const props of Object.entries(args)) {
        this.node[props[0]] = props[1];
      }
    }
    document.body.appendChild(this.node);
  }

  remove(): void {
    this.node.remove();
  }
}

export class ModalWindowComponent extends Component {
  constructor() {
    super(view);
  }

  connected() {
    this.render({
      title: this.getAttribute("title"),
      content: this.innerHTML,
    });
    this.addListener(<HTMLElement>document, "keyup", this._pressEscape);
  }

  clickAway = (e: MouseEvent) => {
    if (e.target["className"] === "modal-content") {
      this.remove();
    }
  };

  closeModal = (e: MouseEvent) => {
    if (e.target["closest"](".close-modal")) {
      this.remove();
    }
  };

  private _pressEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      this.remove();
    }
  };
}
