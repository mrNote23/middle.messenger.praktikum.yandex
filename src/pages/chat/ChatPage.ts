import view from "./ChatPage.hbs";
import { Component } from "../../core/Component";
import State from "../../core/State";
import ChatApp, { ADMIN } from "../../core/ChatApp";
import "./ChatPage.scss";
import { LeftPanel } from "./left-panel/LeftPanel";
import { RightPanel } from "./right-panel/RightPanel";

window.customElements.define("left-panel", LeftPanel);
window.customElements.define("right-panel", RightPanel);

export class ChatPage extends Component {
  bigData: object;

  constructor() {
    super(view);
  }

  tickHandler = (e) => {
    console.log(`tick handler: ${JSON.stringify(e.detail)}`);
  };

  pingHandler = (e) => {
    console.log(`ping handler: ${JSON.stringify(e.detail)}`);
  };

  pongHandler = (e) => {
    console.log(`pong handler: ${JSON.stringify(e.detail)}`);
  };

  bigData = {
    id: 1,
    name: "Andrew",
  };

  connectedCallback(): void {
    // TODO: Временно разрешен вход без авторизации
    this.render();
    const elm = this.querySelector("#sidebar");
    // if (!State.extract(ADMIN)) {
    //   setTimeout(() => {
    //     ChatApp.navigate("/login");
    //   }, 0);
    // } else {
    //   this.render();
    // }
  }
}
