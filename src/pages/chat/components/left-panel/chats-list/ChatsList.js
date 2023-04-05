import view from "./ChatsList.hbs";
import { RenderTo } from "../../../../../core/RenderTo.js";
import { Dispatch, Subscribe, UnSubscribe } from "../../../../../core/State.js";
import Api from "../../../../../core/Api.js";
import "./ChatsList.scss";
import { OnMobile } from "../../../../../utils/on-mobile.js";

export class ChatsList extends HTMLElement {
  constructor() {
    super();
    this.subscriptions = [];
  }

  connectedCallback() {
    this.list = [];
    this.subscriptions.push(
      Subscribe("rightMode", (val) => (this.rightMode = val))
    );
    this.innerHTML = '<div class="loader">Loading...</div>';
    this.fetchList();
  }

  disconnectedCallback() {
    this.subscriptions.forEach((elm) => UnSubscribe(elm));
  }

  fetchList = () => {
    Api.getChats().then((res) => {
      this.list = res;
      this.render();
    });
  };

  selectChat = (e) => {
    const item = e.target.closest("li");
    const chatId = item.id || null;
    if (chatId && !item.classList.contains("active")) {
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

  render = () => {
    RenderTo(this, view, { list: this.list }, [
      { selector: "li.chats-item", event: "click", cb: this.selectChat },
    ]);
  };
}
