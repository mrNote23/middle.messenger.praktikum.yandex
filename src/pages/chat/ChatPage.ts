import view from "./ChatPage.hbs";
import State from "../../core/State";
import { TRoute } from "../../shared/router-component/RouterComponent";
import { Component } from "../../core/Component";
import { LeftBlock } from "./left-block/LeftBlock";
import { STATES } from "../../core/ChatApp";
import { ChatHeader } from "./right-block/chat/chat-header/ChatHeader";
import { ChatBody } from "./right-block/chat/chat-body/ChatBody";
import { ChatFooter } from "./right-block/chat/chat-footer/ChatFooter";
import { AdminProfile } from "./right-block/profiles/admin-profile/AdminProfile";
import { UserProfile } from "./right-block/profiles/user-profile/UserProfile";
import { ChatProfile } from "./right-block/profiles/chat-profile/ChatProfile";
import "./ChatPage.scss";
import { rightRoutes } from "./right-block/rightRoutes";

window.customElements.define("left-block", LeftBlock);

window.customElements.define("chat-header", ChatHeader);
window.customElements.define("chat-body", ChatBody);
window.customElements.define("chat-footer", ChatFooter);
window.customElements.define("admin-profile", AdminProfile);
window.customElements.define("user-profile", UserProfile);
window.customElements.define("chat-profile", ChatProfile);

export class ChatPage extends Component {
  router: HTMLElement;
  rightRoutes: TRoute[];

  constructor() {
    super(view);
    this.rightRoutes = rightRoutes;
  }

  connected(): void {
    // TODO: Временно разрешен вход без авторизации
    this.render();

    this.router = document.getElementById("right-router");

    this.subscriber = State.subscribe(STATES.RIGHT_MODE, (val) => {
      this.router.setAttribute("path", val);
    });

    // if (!State.extract(ADMIN)) {
    //   setTimeout(() => {
    //     ChatApp.navigate("/login");
    //   }, 0);
    // } else {
    //   this.render();
    // }
  }
}
