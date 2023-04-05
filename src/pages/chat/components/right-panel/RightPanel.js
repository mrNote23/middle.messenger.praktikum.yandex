import { Subscribe, UnSubscribe } from "../../../../core/State.js";

const templates = {
  chat: `<chat-current></chat-current>
         <chat-body class="chat-body"></chat-body>
         <chat-sending class="chat-footer"></chat-sending>`,
  adminProfile: `<admin-profile class="profile"></admin-profile>`,
  userProfile: `<user-profile class="profile"></user-profile>`,
  chatProfile: `<chat-profile class="profile"></chat-profile>`,
};

export class RightPanel extends HTMLElement {
  constructor() {
    super();
    this.subscriptions = [];
  }

  connectedCallback() {
    this.subscriptions.push(
      Subscribe("rightMode", (val) => {
        this.innerHTML = templates[val];
      })
    );
  }

  disconnectedCallback() {
    this.subscriptions.forEach((elm) => UnSubscribe(elm));
  }
}
