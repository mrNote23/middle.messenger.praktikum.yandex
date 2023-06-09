import view from "./AdminProfile.hbs";
import { Confirm } from "../../../../../shared/confirm/confirm";
import { Component } from "../../../../../core/Component";
import { TFormValidatorConfig } from "../../../../../shared/form-validator/FormValidator";
import { formFields } from "./formFields";
import { IUser } from "../../../../../core/config/interfaces";
import "./AdminProfile.scss";
import { AuthController } from "../../../../../core/controllers/AuthController";
import { AdminController } from "../../../../../core/controllers/AdminController";
import { ADMIN, TEventTarget, TRecord } from "../../../../../core/config/types";
import Router from "../../../../../core/Router";

export class AdminProfile extends Component {
  admin: IUser | null;
  formFields: TFormValidatorConfig;
  error: HTMLElement;

  constructor() {
    super(view);
    this.formFields = formFields;
  }

  connected(): void {
    this.addSubscriber(ADMIN, this.changedAdminProfile);
  }

  changedAdminProfile = (val: IUser) => {
    this.admin = <IUser>val;
    this.render({ ...this.admin });
    this.error = this.querySelector(".profile-error");
  };

  changeAvatar = (e: TEventTarget) => {
    if (e.target.files) {
      AdminController.changeAdminAvatar(e.target.files[0]);
    }
  };

  errorProfile = (e: { [key: string]: string }) => {
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
    oldObj: TRecord | IUser,
    newObj: TRecord | IUser
  ): boolean => {
    let res = true;
    fields.forEach((field: string) => {
      if (oldObj[field] !== newObj[field]) {
        res = false;
      }
    });
    return res;
  };

  btnLogout = (): void => {
    Confirm({ title: "Are you sure?", text: "Exit from chat?" }, async () => {
      await AuthController.logout();
    });
  };

  btnBack = (): void => {
    Router.history.back();
  };
}
