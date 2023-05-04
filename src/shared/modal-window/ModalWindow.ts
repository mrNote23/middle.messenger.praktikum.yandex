import view from "./ModalWindow.hbs";
import { Component } from "../../core/Component";
import "./ModalWindow.scss";
import { TEventTarget, TNode } from "../../core/config/types";

export class ModalWindow {
  node: TNode;

  constructor(title = "", content = "", args: object | null = null) {
    this.node = document.createElement("modal-window");
    this.node.title = title;
    this.node.innerHTML = content;
    if (args) {
      for (const [key, value] of Object.entries(args)) {
        this.node[key] = value;
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
    this.addListener(<unknown>document, "keyup", this._pressEscape);
  }

  clickAway = (e: TEventTarget) => {
    if (e.target["className"] === "modal-content") {
      this.remove();
    }
  };

  closeModal = (e: TEventTarget) => {
    if (e.target.closest(".close-modal")) {
      this.remove();
    }
  };

  private _pressEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      this.remove();
    }
  };
}
