import view from "./ChatPage.hbs";
import { Component } from "../../core/Component";
import { LeftBlock } from "./left-block/LeftBlock";
import { RightBlock } from "./right-block/RightBlock";
import "./ChatPage.scss";

window.customElements.define("left-block", LeftBlock);
window.customElements.define("right-block", RightBlock);

export class ChatPage extends Component {
  bigData: object;

  constructor() {
    super(view);
    this.classList.add("wrapper");
  }

  connected(): void {
    // TODO: Временно разрешен вход без авторизации
    this.render();
    // if (!State.extract(ADMIN)) {
    //   setTimeout(() => {
    //     ChatApp.navigate("/login");
    //   }, 0);
    // } else {
    //   this.render();
    // }
  }
}
