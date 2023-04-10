import view from "./LeftPanel.hbs";
import { Component } from "../../../../core/Component";
import { IChat } from "../../../../core/interfaces";
import { Dispatch, Subscribe } from "../../../../core/State";
import { OnMobile } from "../../../../utils/on-mobile";
import { AddUser } from "../add-user/AddUser";
import { AddChat } from "../add-chat/AddChat";
import "./LeftPanel.scss";
import { LEFTMODE, RIGHTMODE, STATES } from "../../../../core/Chat";

export class LeftPanel extends Component {
  currentChat: IChat | null = null;
  leftMode: string | null = null;
  rightMode: string | null = null;

  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.subscriber = Subscribe(
      STATES.LEFT_MODE,
      (val) => (this.leftMode = val)
    );
    this.subscriber = Subscribe(
      STATES.RIGHT_MODE,
      (val) => (this.rightMode = val)
    );

    this.subscriber = Subscribe(STATES.CURRENT_CHAT, (val) => {
      this.currentChat = val;
      this.currentChat &&
        document.getElementById("mode-users").classList.remove("d-none");
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
    this.leftMode === LEFTMODE.CHATS ? AddChat() : AddUser();
  };

  openAdminProfile = (): void => {
    if (this.rightMode !== RIGHTMODE.ADMIN_PROFILE) {
      window["prevLeftMode"] = this.leftMode;
      window["prevRightMode"] = this.rightMode;
      Dispatch(STATES.RIGHT_MODE, RIGHTMODE.ADMIN_PROFILE);
      OnMobile.showRightPanel();
    }
  };

  setModeChats = <T>(e: T): void => {
    e.preventDefault();
    if (this.leftMode !== LEFTMODE.CHATS) {
      Dispatch(STATES.LEFT_MODE, LEFTMODE.CHATS);
      Dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT);
      e.target.className = "active";
      document.getElementById("mode-users").className = "";
      document.getElementById("left-container").innerHTML =
        "<chats-list></chats-list>";
    }
  };

  setModeUsers = <T>(e: T): void => {
    e.preventDefault();
    if (this.leftMode !== LEFTMODE.USERS) {
      Dispatch(STATES.LEFT_MODE, LEFTMODE.USERS);
      e.target.className = "active";
      document.getElementById("mode-chats").className = "";
      document.getElementById("left-container").innerHTML =
        "<users-list></users-list>";
    }
  };
}
