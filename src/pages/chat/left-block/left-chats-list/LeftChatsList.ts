import view from "./LeftChatsList.hbs";
import State from "../../../../core/State";
import { Component } from "../../../../core/Component";
import { IChat } from "../../../../core/config/interfaces";
import Chat, { STATES } from "../../../../core/ChatApp";
import "./LeftChatsList.scss";

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
        Chat.loadChatsList();
      } else {
        this.render({
          chatsList: this.chatsList,
          currentChatId: this.currentChat ? this.currentChat.id : null,
        });
      }
    });
  }

  // выбор чата (клик по списку)
  selectChat = <T>(e: T): void => {
    const item: Element = e.target.closest("li");
    const chatId: string | null = item.id || null;
    if (chatId !== null && !item.classList.contains("active")) {
      Chat.setCurrentChat(this.chatsList[chatId.split("-")[1]]);

      document
        .querySelectorAll("li.chats-item.active")
        .forEach((elm) => elm.classList.remove("active"));
      item.classList.add("active");
    }
  };
}
