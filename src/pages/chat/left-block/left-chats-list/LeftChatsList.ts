import view from "./LeftChatsList.hbs";
import { Component } from "../../../../core/Component";
import { IChat } from "../../../../core/config/interfaces";
import ChatApp, { STATES } from "../../../../core/ChatApp";
import { ChatsListItem } from "./chats-list-item/ChatsListItem";
import "./LeftChatsList.scss";

customElements.define("chats-list-item", ChatsListItem);

export class LeftChatsList extends Component {
  chatsList: IChat[] = [];
  currentChat: IChat | null = null;

  constructor() {
    super(view);
  }

  connected(): void {
    // подписка на изменение текущего чата
    this.addSubscriber(
      STATES.CURRENT_CHAT,
      (val: IChat) => (this.currentChat = val)
    );

    // подписка на изменения списка чатов
    this.addSubscriber(STATES.CHATS_LIST, (val: IChat[]) => {
      this.chatsList = val;
      if (!val.length) {
        this.loading();
        ChatApp.loadChatsList();
      } else {
        this.render({
          chatsList: this.chatsList.map((elm, index: number) => {
            return { ...elm, index };
          }),
          currentChatId: this.currentChat ? this.currentChat.id : null,
        });
      }
    });
  }

  // выбор чата
  selectChat = (id) => {
    ChatApp.setCurrentChat(
      this.chatsList.filter((elm) => elm.id === id.detail)[0]
    );
  };
}
