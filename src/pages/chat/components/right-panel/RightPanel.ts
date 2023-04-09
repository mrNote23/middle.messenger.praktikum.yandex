import { Component } from "../../../../core/Component";
import { Subscribe } from "../../../../core/State";

const templates: { [key: string]: string } = {
  chat: `<chat-current></chat-current>
         <chat-body class="chat-body"></chat-body>
         <chat-sending class="chat-footer"></chat-sending>`,
  adminProfile: `<admin-profile class="profile"></admin-profile>`,
  userProfile: `<user-profile class="profile"></user-profile>`,
  chatProfile: `<chat-profile class="profile"></chat-profile>`,
};

export class RightPanel extends Component {
  constructor() {
    super();
  }

  connectedCallback(): void {
    this.subscriber = Subscribe("rightMode", (val) => {
      this.innerHTML = templates[val];
    });
  }
}
