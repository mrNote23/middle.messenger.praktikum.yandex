import view from "./ChatsList.hbs";
import { Dispatch, Subscribe } from "../../../../../core/State.ts";
import Api from "../../../../../core/Api";
import { OnMobile } from "../../../../../utils/on-mobile";
import { Component } from "../../../../../core/Component";
import { IChat } from "../../../../../core/interfaces";
import "./ChatsList.scss";

export class ChatsList extends Component {
  list: IChat[] = [];
  rightMode: string | null = null;

  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.list = [];
    this.subscriber = Subscribe("rightMode", (val) => (this.rightMode = val));
    this.loading();
    this.fetchList();
  }

  fetchList = (): void => {
    Api.getChats().then((res) => {
      this.list = res;
      this.render({ list: this.list }, [
        { selector: "li.chats-item", event: "click", cb: this.selectChat },
      ]);
    });
  };

  selectChat = (e): void => {
    const item: Element = e.target.closest("li");
    const chatId: string | null = item.id || null;
    if (chatId !== null && !item.classList.contains("active")) {
      Dispatch("currentChat", this.list[chatId.split("-")[1]]);
      if (this.rightMode !== "chat") {
        Dispatch("rightMode", "chat");
        this.rightMode = "chat";
      }

      document
        .querySelectorAll("li.chats-item.active")
        .forEach((elm) => elm.classList.remove("active"));
      item.classList.add("active");
    }

    OnMobile.showRightPanel();
  };
}
