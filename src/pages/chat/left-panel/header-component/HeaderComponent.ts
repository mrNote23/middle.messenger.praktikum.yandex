import view from "./HeaderComponent.hbs";
import { Component } from "../../../../core/Component";
import { LEFTMODE, RIGHTMODE, STATES } from "../../../../core/Chat";
import { Dispatch, Subscribe } from "../../../../core/State";
import { OnMobile } from "../../../../utils/on-mobile";
import { AddChat } from "../add-chat/AddChat";
import { AddUser } from "../add-user/AddUser";
import "./HeaderComponent.scss";

export class HeaderComponent extends Component {
  leftMode: string | null = null;
  rightMode: string | null = null;

  constructor() {
    super(view);
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
    }
  };

  setModeUsers = <T>(e: T): void => {
    e.preventDefault();
    if (this.leftMode !== LEFTMODE.USERS) {
      Dispatch(STATES.LEFT_MODE, LEFTMODE.USERS);
      e.target.className = "active";
      document.getElementById("mode-chats").className = "";
    }
  };

  connectedCallback() {
    this.render();

    this.subscriber = Subscribe(
      STATES.LEFT_MODE,
      (val) => (this.leftMode = val)
    );
    this.subscriber = Subscribe(
      STATES.RIGHT_MODE,
      (val) => (this.rightMode = val)
    );
    this.subscriber = Subscribe(STATES.CURRENT_CHAT, (val) => {
      val && document.getElementById("mode-users").classList.remove("d-none");
    });
  }
}
