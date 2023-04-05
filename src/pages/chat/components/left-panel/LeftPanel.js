import view from "./LeftPanel.hbs";
import { RenderTo } from "../../../../core/RenderTo.js";
import "./LeftPanel.scss";
import { Dispatch, Subscribe, UnSubscribe } from "../../../../core/State.js";
import { OnMobile } from "../../../../utils/on-mobile.js";
import { AddUser } from "../add-user/AddUser.js";
import { AddChat } from "../add-chat/AddChat.js";

export class LeftPanel extends HTMLElement {
  constructor() {
    super();
    this.subscriptions = [];
  }

  connectedCallback() {
    this.currentChat = null;

    this.subscriptions.push(
      Subscribe("leftMode", (val) => (this.leftMode = val))
    );
    this.subscriptions.push(
      Subscribe("rightMode", (val) => (this.rightMode = val))
    );

    this.subscriptions.push(
      Subscribe("currentChat", (val) => {
        this.currentChat = val;
        val && document.getElementById("mode-users").classList.remove("d-none");
      })
    );
    RenderTo(
      this,
      view,
      { chatSelected: this.currentChat !== null, mode: this.leftMode },
      [
        {
          selector: "#open-admin-profile",
          event: "click",
          cb: this.openAdminProfile,
        },
        { selector: "#mode-chats", event: "click", cb: this.setModeChats },
        { selector: "#mode-users", event: "click", cb: this.setModeUsers },
        {
          selector: "#add-btn",
          event: "click",
          cb: this.addUserChat,
        },
      ]
    );
  }

  disconnectedCallback() {
    this.subscriptions.forEach((elm) => UnSubscribe(elm));
  }

  addUserChat = () => {
    this.leftMode === "chats" ? AddChat() : AddUser();
  };

  openAdminProfile = () => {
    if (this.rightMode !== "adminProfile") {
      window.prevLeftMode = this.leftMode;
      window.prevRightMode = this.rightMode;
      Dispatch("rightMode", "adminProfile");
      this.rightMode = "adminProfile";
      OnMobile.showRightPanel();
    }
  };

  setModeChats = (e) => {
    e.preventDefault();
    if (this.leftMode !== "chats") {
      Dispatch("leftMode", "chats");
      this.leftMode = "chats";
      e.target.className = "active";
      document.getElementById("mode-users").className = "";
      document.getElementById("left-container").innerHTML =
        "<chats-list></chats-list>";
    }
  };

  setModeUsers = (e) => {
    e.preventDefault();
    if (this.leftMode !== "users") {
      Dispatch("leftMode", "users");
      this.leftMode = "users";
      e.target.className = "active";
      document.getElementById("mode-chats").className = "";
      document.getElementById("left-container").innerHTML =
        "<users-list></users-list>";
    }
  };
}
