import { Dispatch, Extract } from "../../../../../core/State.js";
import view from "./AdminProfile.hbs";
import "./AdminProfile.scss";
import { RenderTo } from "../../../../../core/RenderTo.js";
import { OnMobile } from "../../../../../utils/on-mobile.js";
import { Confirm } from "../../../../../ui/confirm/confirm.js";
import { navigate } from "../../../../../main-router/MainRouter.js";

export class AdminProfile extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.admin = Extract("admin");
    RenderTo(this, view, { ...this.admin }, [
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

  updateProfile = (e) => {
    e.preventDefault();
    Confirm({ title: "Are you sure?", text: "Update profile?" }, this.btnBack);
  };

  btnLogout = () => {
    Confirm({ title: "Are you sure?", text: "Exit from chat?" }, () => {
      navigate("/login");
    });
  };

  btnBack = () => {
    OnMobile.showLeftPanel();
    if (window.prevLeftMode) {
      Dispatch("leftMode", window.prevLeftMode);
      window.prevLeftMode = null;
    } else {
      Dispatch("leftMode", "chats");
    }

    if (window.prevRightMode) {
      Dispatch("rightMode", window.prevRightMode);
      window.prevRightMode = null;
    } else {
      Dispatch("rightMode", "chat");
    }
  };
}
