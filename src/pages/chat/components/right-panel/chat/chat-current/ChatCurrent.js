import view from "./ChatCurrent.hbs";
import {
  Dispatch,
  Subscribe,
  UnSubscribe,
} from "../../../../../../core/State.js";
import { RenderTo } from "../../../../../../core/RenderTo.js";
import { OnMobile } from "../../../../../../utils/on-mobile.js";
import "./ChatCurrent.scss";

export class ChatCurrent extends HTMLElement {
  constructor() {
    super();
    this.subscriptions = [];
  }

  connectedCallback() {
    this.chat = null;
    this.usersAvatars = [];
    this.usersCountAvatar = 0;
    this.chatUsers = [];

    this.subscriptions.push(
      Subscribe("chatUsers", (val) => {
        this.chatUsers = val;
        this.changeChat(this.chat);
      })
    );
    this.subscriptions.push(Subscribe("currentChat", this.changeChat));
  }

  disconnectedCallback() {
    this.subscriptions.forEach((elm) => UnSubscribe(elm));
  }

  changeChat = (chat) => {
    this.chat = chat;
    this.usersAvatars = [];

    Object.values(this.chatUsers)
      .slice(3)
      .forEach((u) => this.usersAvatars.push(u.avatar));
    this.usersCountAvatar =
      Object.keys(this.chatUsers).length < 10
        ? Object.keys(this.chatUsers).length
        : "99+";
    this.render();
  };

  openChatProfile = () => {
    Dispatch("rightMode", "chatProfile");
  };

  render = () => {
    RenderTo(
      this,
      view,
      {
        ...this.chat,
        usersAvatars: this.usersAvatars,
        usersCountAvatar: this.usersCountAvatar,
        showAvatars: this.usersAvatars.length > 0,
      },
      [
        { selector: "#back", event: "click", cb: OnMobile.showLeftPanel },
        {
          selector: "#chat-profile-btn",
          event: "click",
          cb: this.openChatProfile,
        },
      ]
    );
  };
}
