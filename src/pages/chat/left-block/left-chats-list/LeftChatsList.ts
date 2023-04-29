import view from "./LeftChatsList.hbs";
import { Component } from "../../../../core/Component";
import { IChat } from "../../../../core/config/interfaces";
import { ChatsListItem } from "./chats-list-item/ChatsListItem";
import "./LeftChatsList.scss";
import { ChatController } from "../../../../core/controllers/ChatController";
import { STATES } from "../../../../core/config/types";

customElements.define("chats-list-item", ChatsListItem);

export class LeftChatsList extends Component {
  chatsList: IChat[] | null = null;
  currentChat: IChat | null = null;
  listEmpty = true;

  constructor() {
    super(view);
  }

  connected(): void {
    // подписка на изменение текущего чата
    this.addSubscriber(STATES.CURRENT_CHAT, (val: IChat) => {
      this.currentChat = val;
    });

    // подписка на изменения списка чатов
    this.addSubscriber(STATES.CHATS_LIST, (val: IChat[]) => {
      this.listEmpty = true;
      this.chatsList = val;
      if (this.chatsList !== null) {
        this.listEmpty = !(this.chatsList.length > 0);
        this.render({
          chatsList: this.chatsList.map((elm, index: number) => {
            return { ...elm, index };
          }),
          currentChatId: this.currentChat ? this.currentChat.id : null,
          listEmpty: this.listEmpty,
        });
      }
    });

    if (this.chatsList === null) {
      this.loading();
      ChatController.loadChatsList();
    }
  }

  // выбор чата
  selectChat = (id) => {
    ChatController.setCurrentChat(
      this.chatsList.filter((elm) => elm.id === id.detail)[0]
    );
  };
}
