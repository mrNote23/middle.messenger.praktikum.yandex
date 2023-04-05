import view from "./ChatProfile.hbs";
import { Dispatch, Extract } from "../../../../../core/State.js";
import { RenderTo } from "../../../../../core/RenderTo.js";
import { Confirm } from "../../../../../ui/confirm/confirm.js";
import "./ChatProfile.scss";

export class ChatProfile extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.chat = Extract("currentChat");
    RenderTo(this, view, { ...this.chat }, [
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

  renameChat = () => {
    Confirm(
      { title: "Are you sure?", text: "Do you want to rename the chat?" },
      () => {}
    );
  };

  clearChat = () => {
    Confirm(
      { title: "Are you sure?", text: "Do you want to clear the chat?" },
      () => {}
    );
  };

  deleteChat = () => {
    Confirm(
      { title: "Are you sure?", text: "Do you want to delete a chat?" },
      () => {}
    );
  };
}
