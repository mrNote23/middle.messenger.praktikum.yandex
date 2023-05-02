import view from "./ChatProfile.hbs";
import { Confirm } from "../../../../../shared/confirm/confirm";
import { Component } from "../../../../../core/Component";
import { IChat } from "../../../../../core/config/interfaces";
import { RenameChat } from "./rename-chat/RenameChat";
import { ChatController } from "../../../../../core/controllers/ChatController";
import { STATES } from "../../../../../core/config/types";
import Router from "../../../../../core/Router";
import "./ChatProfile.scss";

export class ChatProfile extends Component {
  private _chat: IChat;

  constructor() {
    super(view);
  }

  connected() {
    this.addSubscriber(STATES.CURRENT_CHAT, this._changedChat);
  }

  private _changedChat = (val: IChat): void => {
    this._chat = val;
    this.render({ ...this._chat });
  };

  changeAvatar = <T>(e: T): void => {
    if (e.target.files) {
      ChatController.changeChatAvatar(this._chat.id, e.target.files[0]);
    }
  };

  backBtn = (): void => {
    Router.go(`/chat/${this._chat.id}`);
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
        ChatController.deleteChat(this._chat.id);
      }
    );
  };
}
