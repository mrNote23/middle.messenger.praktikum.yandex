import view from "./ChatProfile.hbs";
import { Dispatch, Extract, Subscribe } from "../../../../core/State.ts";
import { Confirm } from "../../../../ui/confirm/confirm";
import { Component } from "../../../../core/Component";
import "./ChatProfile.scss";
import { IChat } from "../../../../core/interfaces";
import { RIGHTMODE, STATES } from "../../../../core/Chat";
import { RenameChat } from "./rename-chat/RenameChat";

export class ChatProfile extends Component {
  chat: IChat;

  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.subscriber = Subscribe(STATES.CURRENT_CHAT, (val) => {
      this.chat = val;
      this.render({ ...this.chat });
    });
  }

  backBtn = () => {
    Dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT);
  };

  renameChat = (): void => {
    RenameChat();
  };

  clearChat = (): void => {
    Confirm(
      { title: "Are you sure?", text: "Do you want to clear the chat?" },
      () => {
        console.log("Chat cleared");
      }
    );
  };

  deleteChat = (): void => {
    Confirm(
      { title: "Are you sure?", text: "Do you want to delete a chat?" },
      () => {
        console.log("Chat deleted");
      }
    );
  };
}
