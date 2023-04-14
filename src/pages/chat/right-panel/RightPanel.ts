import { Component } from "../../../core/Component";
import State from "../../../core/State";
import { STATES } from "../../../core/ChatApp";
import { ChatHeader } from "./chat/chat-header/ChatHeader";
import { ChatBody } from "./chat/chat-body/ChatBody";
import { ChatFooter } from "./chat/chat-footer/ChatFooter";
import { AdminProfile } from "./admin-profile/AdminProfile";
import { UserProfile } from "./user-profile/UserProfile";
import { ChatProfile } from "./chat-profile/ChatProfile";

window.customElements.define("chat-header", ChatHeader);
window.customElements.define("chat-body", ChatBody);
window.customElements.define("chat-footer", ChatFooter);
window.customElements.define("admin-profile", AdminProfile);
window.customElements.define("user-profile", UserProfile);
window.customElements.define("chat-profile", ChatProfile);

const templates: { [key: string]: string } = {
  chat: "<chat-header class='chat-header'></chat-header><chat-body class='chat-body'></chat-body><chat-footer class='chat-footer'></chat-footer>",
  adminProfile: "<admin-profile class='profile'></admin-profile>",
  userProfile: "<user-profile class='profile'></user-profile>",
  chatProfile: "<chat-profile class='profile'></chat-profile>",
};

export class RightPanel extends Component {
  constructor() {
    super();
  }

  connected(): void {
    this.subscriber = State.subscribe(STATES.RIGHT_MODE, (val) => {
      this.innerHTML = templates[val];
    });
  }
}
