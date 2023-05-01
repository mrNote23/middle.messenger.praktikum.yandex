import view from "./ChatProfile.hbs";
import { Confirm } from "../../../../../shared/confirm/confirm";
import { Component } from "../../../../../core/Component";
import "./ChatProfile.scss";
import { IChat } from "../../../../../core/config/interfaces";
import { RenameChat } from "./rename-chat/RenameChat";
import { ChatController } from "../../../../../core/controllers/ChatController";
import { STATES } from "../../../../../core/config/types";
import Router from "../../../../../core/Router";

export class ChatProfile extends Component {
  chat: IChat;

  constructor() {
    super(view);
  }

  connected(): void {
    this.addSubscriber(STATES.CURRENT_CHAT, this.changedChat);
  }

  changedChat = (val: IChat) => {
    this.chat = val;
    this.render({ ...this.chat });
  };

  changeAvatar = (e) => {
    if (e.target.files) {
      ChatController.changeChatAvatar(this.chat.id, e.target.files[0]);
    }
  };

  backBtn = () => {
    Router.go(`/chat/${this.chat.id}`);
  };

  renameChat = (): void => {
    RenameChat();
  };

  clearChat = (): void => {
    Confirm(
      { title: "Are you sure?", text: "Do you want to clear the chat?" },
      () => {
        console.log("chat cleared");
      }
    );
  };

  deleteChat = (): void => {
    Confirm(
      { title: "Are you sure?", text: "Do you want to delete a chat?" },
      () => {
        ChatController.deleteChat(this.chat.id);
      }
    );
  };
}
