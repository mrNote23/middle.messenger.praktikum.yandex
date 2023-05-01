import view from "./LeftHeader.hbs";
import { Component } from "../../../../core/Component";
import State from "../../../../core/State";
import { AddChat } from "../left-modals/add-chat/AddChat";
import { AddUser } from "../left-modals/add-user/AddUser";
import { LEFTMODE, STATES } from "../../../../core/config/types";
import { IChat } from "../../../../core/config/interfaces";
import "./LeftHeader.scss";

export class LeftHeader extends Component {
  leftMode: string | null = null;
  rightMode: string | null = null;

  constructor() {
    super(view);
  }

  connected() {
    this.render();
    this.addSubscriber(STATES.LEFT_MODE, this.changedMode);
    this.addSubscriber(STATES.CURRENT_CHAT, this.changedChat);
  }

  changedMode = (val: string) => {
    this.leftMode = val;
    if (val === LEFTMODE.CHATS) {
      document.getElementById("mode-users").classList.remove("active");
      document.getElementById("mode-chats").classList.add("active");
    } else {
      document
        .getElementById("mode-chats")
        .setAttribute("href", `/chat/${State.extract(STATES.CURRENT_CHAT).id}`);
      document.getElementById("mode-users").classList.add("active");
      document.getElementById("mode-chats").classList.remove("active");
    }
  };

  changedChat = (val: IChat) => {
    if (val) {
      document
        .getElementById("mode-users")
        .setAttribute("href", `/users/${val.id}`);
      document.getElementById("mode-users").classList.remove("d-none");
    } else {
      document.getElementById("mode-users").classList.add("d-none");
    }
  };

  addUserChat = (): void => {
    this.leftMode === LEFTMODE.CHATS ? AddChat() : AddUser();
  };
}
