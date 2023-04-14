import view from "./ChatPage.hbs";
import { Component } from "../../core/Component";
import { LeftPanel } from "./left-panel/LeftPanel";
import { RightPanel } from "./right-panel/RightPanel";
import "./ChatPage.scss";

window.customElements.define("left-panel", LeftPanel);
window.customElements.define("right-panel", RightPanel);

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
