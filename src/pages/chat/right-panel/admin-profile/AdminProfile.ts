import { Dispatch, Extract } from "../../../../core/State.ts";
import view from "./AdminProfile.hbs";
import { OnMobile } from "../../../../utils/on-mobile";
import { Confirm } from "../../../../ui/confirm/confirm";
import { navigate } from "../../../../ui/main-router/MainRouter.ts";
import { Component } from "../../../../core/Component";
import { ADMIN, LEFTMODE, RIGHTMODE, STATES } from "../../../../core/Chat";

export class AdminProfile extends Component {
  admin: {};

  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.admin = Extract(ADMIN);
    this.render({ ...this.admin });
  }

  updateProfile = <T>(e: T): void => {
    e.preventDefault();
    Confirm({ title: "Are you sure?", text: "Update profile?" }, this.btnBack);
  };

  btnLogout = (): void => {
    Confirm({ title: "Are you sure?", text: "Exit from chat?" }, () => {
      navigate("/login");
    });
  };

  btnBack = (): void => {
    OnMobile.showLeftPanel();
    if (window["prevLeftMode"]) {
      Dispatch(STATES.LEFT_MODE, window["prevLeftMode"]);
      window["prevLeftMode"] = null;
    } else {
      Dispatch(STATES.LEFT_MODE, LEFTMODE.CHATS);
    }

    if (window["prevRightMode"]) {
      Dispatch(STATES.RIGHT_MODE, window["prevRightMode"]);
      window["prevRightMode"] = null;
    } else {
      Dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT);
    }
  };
}
