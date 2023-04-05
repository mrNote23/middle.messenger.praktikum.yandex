import view from "./ModalWindow.hbs";
import "./ModalWindow.scss";

export class ModalWindow extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = view({
      title: this.getAttribute("title"),
      content: this.innerHTML,
    });

    document.addEventListener("keyup", this.pressEscape);
    document
      .querySelector(".modal-content")
      .addEventListener("click", this.clickAway);
    document.querySelectorAll(".close-modal").forEach((elm) => {
      elm.addEventListener("click", this.closeModal);
    });
  }

  disconnectedCallback() {}

  clickAway = (e) => {
    if (e.target.className === "modal-content") {
      this.remove();
    }
  };

  pressEscape = (e) => {
    if (e.key === "Escape") {
      this.remove();
    }
  };

  closeModal = (e) => {
    if (e.target.closest(".close-modal")) {
      this.remove();
    }
  };
}
