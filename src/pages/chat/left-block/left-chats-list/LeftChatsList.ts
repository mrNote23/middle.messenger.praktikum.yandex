import view from "./LeftChatsList.hbs";
import { Component } from "../../../../core/Component";
import { IChat } from "../../../../core/config/interfaces";
import { ChatsListItem } from "./chats-list-item/ChatsListItem";
import { ChatController } from "../../../../core/controllers/ChatController";
import { STATES } from "../../../../core/config/types";
import Router from "../../../../core/Router";
import "./LeftChatsList.scss";

customElements.define("chats-list-item", ChatsListItem);

export class LeftChatsList extends Component {
  chatsList: IChat[] | null = null;
  private _currentChat: IChat | null = null;
  private _listEmpty = true;

  constructor() {
    super(view);
  }

  connected() {
    this.addSubscriber(STATES.CURRENT_CHAT, this._changedChat);
    this.addSubscriber(STATES.CHATS_LIST, this._changedChatsList);

    if (this.chatsList === null) {
      this.loading();
      ChatController.loadChatsList();
    }
  }

  selectChat = (id: CustomEvent): void => {
    ChatController.setCurrentChat(id.detail);
    Router.history.pushState({}, "", `/chat/${id.detail}`);
  };

  private _changedChat = (val: IChat): IChat => (this._currentChat = val);

  private _changedChatsList = (val: IChat[]): void => {
    this._listEmpty = true;
    this.chatsList = val;
    if (this.chatsList !== null) {
      this._listEmpty = !(this.chatsList.length > 0);
      this.render({
        chatsList: this.chatsList.map((elm, index: number) => {
          return { ...elm, index };
        }),
        currentChatId: this._currentChat ? this._currentChat.id : null,
        listEmpty: this._listEmpty,
      });
    }
  };
}
