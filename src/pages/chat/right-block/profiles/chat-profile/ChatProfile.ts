import view from "./ChatProfile.hbs";
import State from "../../../../../core/State";
import { Confirm } from "../../../../../shared/confirm/confirm";
import { Component } from "../../../../../core/Component";
import "./ChatProfile.scss";
import { IChat } from "../../../../../core/config/interfaces";
import ChatApp, { RIGHTMODE, STATES } from "../../../../../core/ChatApp";
import { RenameChat } from "./rename-chat/RenameChat";

export class ChatProfile extends Component {
  chat: IChat;

  constructor() {
    super(view);
  }

  connected(): void {
    this.addSubscriber(STATES.CURRENT_CHAT, (val) => {
      this.chat = val;
      this.render({ ...this.chat });
    });
  }

  backBtn = () => {
    State.dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT);
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
        ChatApp.deleteChat(this.chat.id);
      }
    );
  };
}
