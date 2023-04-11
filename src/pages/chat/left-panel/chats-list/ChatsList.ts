import view from "./ChatsList.hbs";
import { Dispatch, Subscribe } from "../../../../core/State.ts";
import Api from "../../../../core/Api";
import { OnMobile } from "../../../../utils/on-mobile";
import { Component } from "../../../../core/Component";
import { IChat } from "../../../../core/interfaces";
import "./ChatsList.scss";
import Chat, { STATES } from "../../../../core/Chat";

export class ChatsList extends Component {
  chatsList: IChat[] = [];
  currentChat: IChat | null = null;

  constructor() {
    super(view);
  }

  connectedCallback(): void {
    // подписка на изменение текущего чата
    this.subscriber = Subscribe(
      STATES.CURRENT_CHAT,
      (val) => (this.currentChat = val)
    );

    // подписка на изменения списка чатов
    this.subscriber = Subscribe(STATES.CHATS_LIST, (val) => {
      this.chatsList = val;
      if (!val.length) {
        this.loading();
        Chat.loadChatsList();
      } else {
        this.render({
          chatsList: this.chatsList,
          currentChatId: this.currentChat?.id,
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
