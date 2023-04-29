import view from "./AdminProfile.hbs";
import State from "../../../../../core/State";
import { OnMobile } from "../../../../../utils/on-mobile";
import { Confirm } from "../../../../../shared/confirm/confirm";
import { Component } from "../../../../../core/Component";
import { TFormValidatorConfig } from "../../../../../shared/form-validator/FormValidator";
import { formFields } from "./formFields";
import { IUser } from "../../../../../core/config/interfaces";
import "./AdminProfile.scss";
import { AuthController } from "../../../../../core/controllers/AuthController";
import { AdminController } from "../../../../../core/controllers/AdminController";
import {
  ADMIN,
  LEFTMODE,
  RIGHTMODE,
  STATES,
} from "../../../../../core/config/types";

export class AdminProfile extends Component {
  admin: IUser | null;
  formFields: TFormValidatorConfig;
  error: HTMLElement;

  constructor() {
    super(view);
    this.formFields = formFields;
  }

  connected(): void {
    this.addSubscriber(ADMIN, (val) => {
      this.admin = <IUser>val;
      this.render({ ...this.admin });
      this.error = this.querySelector(".profile-error");
    });
  }

  changeAvatar = (e: unknown) => {
    if (e.target.files) {
      AdminController.changeAdminAvatar(e.target.files[0]);
    }
  };

  errorProfile = (e: unknown) => {
    this.error.textContent = e.reason;
    this.error.style.display = "block";
  };

  formValidated = (e: CustomEvent): void => {
    this.error.style.display = "none";
    Confirm({ title: "Are you sure?", text: "Update profile?" }, () => {
      // если были изменения в профиле, то обновим его
      if (
        !this._compareFields(
          [
            "first_name",
            "second_name",
            "display_name",
            "login",
            "email",
            "phone",
          ],
          this.admin,
          e.detail
        )
      ) {
        AdminController.changeAdminProfile(
          e.detail,
          this.errorProfile,
          this.btnBack
        );
      }

      // при необходимости обновим пароль
      if (e.detail.newPassword !== "") {
        AdminController.changeAdminPassword(
          e.detail.oldPassword,
          e.detail.newPassword,
          this.errorProfile,
          this.btnBack
        );
      }
    });
  };

  _compareFields = (
    fields: string[],
    oldObj: object,
    newObj: object
  ): boolean => {
    let res = true;
    fields.forEach((field) => {
      if (oldObj[field] !== newObj[field]) {
        res = false;
      }
    });
    return res;
  };

  btnLogout = (): void => {
    Confirm({ title: "Are you sure?", text: "Exit from chat?" }, () => {
      AuthController.logout();
    });
  };

  btnBack = (): void => {
    OnMobile.showLeftPanel();
    if (window["prevLeftMode"]) {
      State.dispatch(STATES.LEFT_MODE, window["prevLeftMode"]);
      window["prevLeftMode"] = null;
    } else {
      State.dispatch(STATES.LEFT_MODE, LEFTMODE.CHATS);
    }

    if (window["prevRightMode"]) {
      State.dispatch(STATES.RIGHT_MODE, window["prevRightMode"]);
      window["prevRightMode"] = null;
    } else {
      State.dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT);
    }
  };
}
