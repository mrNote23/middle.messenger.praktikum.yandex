import view from "./ChatBody.hbs";
import { Extract, Subscribe } from "../../../../../core/State.ts";
import { Component } from "../../../../../core/Component";
import "./ChatBody.scss";
import { IChat } from "../../../../../core/interfaces";
import { ADMIN, STATES } from "../../../../../core/Chat";

export class ChatBody extends Component {
  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.subscriber = Subscribe(STATES.CURRENT_CHAT, this.chatChanged);
  }

  chatChanged = (chat: IChat | "loading"): void => {
    if (chat === "loading") {
      this.loading();
    } else {
      this.render({
        messages: Extract(STATES.CHAT_MESSAGES),
        adminId: Extract(ADMIN).id,
        notSelected: !Extract(STATES.CHAT_MESSAGES),
      });
    }
  };
}
