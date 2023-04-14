import view from "./HeaderComponent.hbs";
import { Component } from "../../../../core/Component";
import { LEFTMODE, RIGHTMODE, STATES } from "../../../../core/ChatApp";
import State from "../../../../core/State";
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
      State.dispatch(STATES.RIGHT_MODE, RIGHTMODE.ADMIN_PROFILE);
      OnMobile.showRightPanel();
    }
  };

  setModeChats = <T>(e: T): void => {
    e.preventDefault();
    if (this.leftMode !== LEFTMODE.CHATS) {
      State.dispatch(STATES.LEFT_MODE, LEFTMODE.CHATS);
      State.dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT);
      e.target.className = "active";
      document.getElementById("mode-users").className = "";
    }
  };

  setModeUsers = <T>(e: T): void => {
    e.preventDefault();
    if (this.leftMode !== LEFTMODE.USERS) {
      State.dispatch(STATES.LEFT_MODE, LEFTMODE.USERS);
      e.target.className = "active";
      document.getElementById("mode-chats").className = "";
    }
  };

  connected() {
    this.render();

    this.subscriber = State.subscribe(
      STATES.LEFT_MODE,
      (val) => (this.leftMode = val)
    );
    this.subscriber = State.subscribe(
      STATES.RIGHT_MODE,
      (val) => (this.rightMode = val)
    );
    this.subscriber = State.subscribe(STATES.CURRENT_CHAT, (val) => {
      val && document.getElementById("mode-users").classList.remove("d-none");
    });
  }
}
