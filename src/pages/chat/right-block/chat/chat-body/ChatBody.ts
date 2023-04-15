import view from "./ChatBody.hbs";
import State from "../../../../../core/State";
import { Component } from "../../../../../core/Component";
import "./ChatBody.scss";
import { IChat } from "../../../../../core/config/interfaces";
import { ADMIN, STATES } from "../../../../../core/ChatApp";

export class ChatBody extends Component {
  constructor() {
    super(view);
  }

  connected(): void {
    this.subscriber = State.subscribe(STATES.CURRENT_CHAT, this.chatChanged);
  }

  chatChanged = (chat: IChat | "loading"): void => {
    if (chat === "loading") {
      this.loading();
    } else {
      this.render({
        messages: State.extract(STATES.CHAT_MESSAGES),
        adminId: State.extract(ADMIN).id,
        notSelected: !State.extract(STATES.CHAT_MESSAGES),
      });
    }
  };
}
