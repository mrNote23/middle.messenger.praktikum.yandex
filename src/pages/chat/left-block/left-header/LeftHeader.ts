import view from "./LeftHeader.hbs";
import { Component } from "../../../../core/Component";
import State from "../../../../core/State";
import { AddChat } from "../left-modals/add-chat/AddChat";
import { AddUser } from "../left-modals/add-user/AddUser";
import { LEFTMODE, STATES } from "../../../../core/config/types";
import { IChat } from "../../../../core/config/interfaces";
import "./LeftHeader.scss";

export class LeftHeader extends Component {
  private _leftMode: string | null = null;

  constructor() {
    super(view);
  }

  connected() {
    this.render();
    this.addSubscriber(STATES.LEFT_MODE, this._changedMode);
    this.addSubscriber(STATES.CURRENT_CHAT, this._changedChat);
  }

  addUserChat = (): void => {
    this._leftMode === LEFTMODE.CHATS ? AddChat() : AddUser();
  };

  private _changedMode = (val: string): void => {
    this._leftMode = val;
    if (val === LEFTMODE.CHATS) {
      document.getElementById("mode-users")?.classList.remove("active");
      document.getElementById("mode-chats")?.classList.add("active");
    } else {
      document
        .getElementById("mode-chats")
        .setAttribute(
          "href",
          `/chat/${(State.extract(STATES.CURRENT_CHAT) as IChat).id}`
        );
      document.getElementById("mode-users")?.classList.add("active");
      document.getElementById("mode-chats")?.classList.remove("active");
    }
  };

  private _changedChat = (val: IChat): void => {
    if (val) {
      document
        .getElementById("mode-users")
        .setAttribute("href", `/users/${val.id}`);
      document.getElementById("mode-users")?.classList.remove("d-none");
    } else {
      document.getElementById("mode-users")?.classList.add("d-none");
    }
  };
}
