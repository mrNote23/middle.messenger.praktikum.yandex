import view from "./ChatProfile.hbs";
import { Dispatch, Extract } from "../../../../../core/State.ts";
import { Confirm } from "../../../../../ui/confirm/confirm";
import "./ChatProfile.scss";
import { Component } from "../../../../../core/Component";
import { IChat } from "../../../../../core/interfaces";

export class ChatProfile extends Component {
  chat: IChat;

  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.chat = Extract("currentChat");
    this.render({ ...this.chat }, [
      {
        selector: "#back",
        event: "click",
        cb: () => {
          Dispatch("rightMode", "chat");
        },
      },
      {
        selector: "#chat-rename",
        event: "click",
        cb: this.renameChat,
      },
      {
        selector: "#chat-clear",
        event: "click",
        cb: this.clearChat,
      },
      {
        selector: "#chat-delete",
        event: "click",
        cb: this.deleteChat,
      },
    ]);
  }

  renameChat = (): void => {
    Confirm(
      { title: "Are you sure?", text: "Do you want to rename the chat?" },
      () => {}
    );
  };

  clearChat = (): void => {
    Confirm(
      { title: "Are you sure?", text: "Do you want to clear the chat?" },
      () => {}
    );
  };

  deleteChat = (): void => {
    Confirm(
      { title: "Are you sure?", text: "Do you want to delete a chat?" },
      () => {}
    );
  };
}
