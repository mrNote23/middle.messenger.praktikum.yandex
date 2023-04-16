import view from "./LeftChatsList.hbs";
import State from "../../../../core/State";
import { Component } from "../../../../core/Component";
import { IChat } from "../../../../core/config/interfaces";
import ChatApp, { STATES } from "../../../../core/ChatApp";
import { ChatsListItem } from "./chats-list-item/ChatsListItem";
import "./LeftChatsList.scss";

window.customElements.define("chats-list-item", ChatsListItem);

export class LeftChatsList extends Component {
  chatsList: IChat[] = [];
  currentChat: IChat | null = null;

  constructor() {
    super(view);
  }

  connected(): void {
    // подписка на изменение текущего чата
    this.subscriber = State.subscribe(
      STATES.CURRENT_CHAT,
      (val) => (this.currentChat = val)
    );

    // подписка на изменения списка чатов
    this.subscriber = State.subscribe(STATES.CHATS_LIST, (val) => {
      this.chatsList = val;
      if (!val.length) {
        this.loading();
        ChatApp.loadChatsList();
      } else {
        this.render({
          chatsList: this.chatsList,
          currentChatId: this.currentChat ? this.currentChat.id : null,
        });
      }
    });
  }

  // выбор чата
  selectChat(id) {
    ChatApp.setCurrentChat(this.chatsList[id]);
  }
}
