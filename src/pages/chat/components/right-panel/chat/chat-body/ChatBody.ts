import view from "./ChatBody.hbs";
import { Extract, Subscribe } from "../../../../../../core/State.ts";
import { Component } from "../../../../../../core/Component";
import "./ChatBody.scss";
import { IChat } from "../../../../../../core/interfaces";

export class ChatBody extends Component {
  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.subscriber = Subscribe("currentChat", this.chatChanged);
  }

  chatChanged = (chat: IChat | "loading"): void => {
    if (chat === "loading") {
      this.loading();
    } else {
      this.render({
        messages: Extract("chatMessages"),
        adminId: Extract("admin").id,
        notSelected: !Extract("chatMessages"),
      });
    }
  };
}
