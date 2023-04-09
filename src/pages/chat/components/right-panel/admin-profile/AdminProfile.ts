import { Dispatch, Extract } from "../../../../../core/State.ts";
import view from "./AdminProfile.hbs";
import { OnMobile } from "../../../../../utils/on-mobile";
import { Confirm } from "../../../../../ui/confirm/confirm";
import { navigate } from "../../../../../main-router/MainRouter.ts";
import { Component } from "../../../../../core/Component";
import "./AdminProfile.scss";

export class AdminProfile extends Component {
  admin: {};

  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.admin = Extract("admin");
    this.render({ ...this.admin }, [
      {
        selector: "#back",
        event: "click",
        cb: this.btnBack,
      },
      {
        selector: "#admin-profile-form",
        event: "submit",
        cb: this.updateProfile,
      },
      {
        selector: "#logout",
        event: "click",
        cb: this.btnLogout,
      },
    ]);
  }

  updateProfile = (e: Event): void => {
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
      Dispatch("leftMode", window["prevLeftMode"]);
      window["prevLeftMode"] = null;
    } else {
      Dispatch("leftMode", "chats");
    }

    if (window["prevRightMode"]) {
      Dispatch("rightMode", window["prevRightMode"]);
      window["prevRightMode"] = null;
    } else {
      Dispatch("rightMode", "chat");
    }
  };
}
