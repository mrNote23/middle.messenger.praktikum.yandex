import view from "./LeftPanel.hbs";
import { Component } from "../../../../core/Component";
import { IChat } from "../../../../core/interfaces";
import { Dispatch, Subscribe } from "../../../../core/State";
import { OnMobile } from "../../../../utils/on-mobile";
import { AddUser } from "../add-user/AddUser";
import { AddChat } from "../add-chat/AddChat";
import "./LeftPanel.scss";

export class LeftPanel extends Component {
  currentChat: IChat | null = null;
  leftMode: string | null = null;
  rightMode: string | null = null;

  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.currentChat = null;

    this.subscriber = Subscribe("leftMode", (val) => (this.leftMode = val));
    this.subscriber = Subscribe("rightMode", (val) => (this.rightMode = val));

    this.subscriber = Subscribe("currentChat", (val) => {
      this.currentChat = val;
      val && document.getElementById("mode-users").classList.remove("d-none");
    });
    this.render(
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

  addUserChat = (): void => {
    this.leftMode === "chats" ? AddChat() : AddUser();
  };

  openAdminProfile = (): void => {
    if (this.rightMode !== "adminProfile") {
      window["prevLeftMode"] = this.leftMode;
      window["prevRightMode"] = this.rightMode;
      Dispatch("rightMode", "adminProfile");
      this.rightMode = "adminProfile";
      OnMobile.showRightPanel();
    }
  };

  setModeChats = (e: PointerEvent): void => {
    e.preventDefault();
    if (this.leftMode !== "chats") {
      Dispatch("leftMode", "chats");
      this.leftMode = "chats";
      e.target["className"] = "active";
      document.getElementById("mode-users").className = "";
      document.getElementById("left-container").innerHTML =
        "<chats-list></chats-list>";
    }
  };

  setModeUsers = (e: PointerEvent): void => {
    e.preventDefault();
    if (this.leftMode !== "users") {
      Dispatch("leftMode", "users");
      this.leftMode = "users";
      e.target["className"] = "active";
      document.getElementById("mode-chats").className = "";
      document.getElementById("left-container").innerHTML =
        "<users-list></users-list>";
    }
  };
}
