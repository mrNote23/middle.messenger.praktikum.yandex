import view from "./LeftHeader.hbs";
import { Component } from "../../../../core/Component";
import State from "../../../../core/State";
import { OnMobile } from "../../../../utils/on-mobile";
import { AddChat } from "../left-modals/add-chat/AddChat";
import { AddUser } from "../left-modals/add-user/AddUser";
import "./LeftHeader.scss";
import { LEFTMODE, RIGHTMODE, STATES } from "../../../../core/config/types";

export class LeftHeader extends Component {
  leftMode: string | null = null;
  rightMode: string | null = null;

  constructor() {
    super(view);
  }

  connected() {
    this.render();
    this.addSubscriber(STATES.LEFT_MODE, (val) => (this.leftMode = val));
    this.addSubscriber(STATES.RIGHT_MODE, (val) => (this.rightMode = val));
    this.addSubscriber(STATES.CURRENT_CHAT, (val) => {
      if (val) {
        document.getElementById("mode-users").classList.remove("d-none");
      } else {
        document.getElementById("mode-users").classList.add("d-none");
      }
    });
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
}
