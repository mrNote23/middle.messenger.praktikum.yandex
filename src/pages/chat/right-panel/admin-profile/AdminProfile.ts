import { Dispatch, Extract } from "../../../../core/State.ts";
import view from "./AdminProfile.hbs";
import { OnMobile } from "../../../../utils/on-mobile";
import { Confirm } from "../../../../ui/confirm/confirm";
import { navigate } from "../../../../ui/main-router/MainRouter.ts";
import { Component } from "../../../../core/Component";
import { ADMIN, LEFTMODE, RIGHTMODE, STATES } from "../../../../core/Chat";
import {
  FormValidator,
  TFormValidatorConfig,
} from "../../../../core/FormValidator";
import { IUser } from "../../../../core/interfaces";

const formFields: TFormValidatorConfig = {
  first_name: {
    required: true,
    firstUC: true,
    maxLength: 50,
    message: "letters only (no spaces) or '-'",
  },
  second_name: {
    required: true,
    firstUC: true,
    maxLength: 50,
    message: "letters only (no spaces) or '-'",
  },
  display_name: {
    required: true,
    maxLength: 20,
    message: "letters only (no spaces) or '-'",
  },
  login: {
    required: true,
    minLength: 3,
    maxLength: 20,
    message: "3 to 20 characters, letters, numbers, '-'",
  },
  email: {
    required: true,
    match: "email",
    maxLength: 50,
    message: "correct email address (ivan@mail.ru)",
  },
  phone: {
    required: true,
    minLength: 10,
    maxLength: 15,
    match: "phone",
    message: "phone number in the format +79615432367",
  },
  oldPassword: {
    match: "password",
    minLength: 8,
    maxLength: 40,
    message: "8 to 40 characters must contains uppercase letters and numbers",
  },
  newPassword: {
    minLength: 8,
    maxLength: 40,
    match: "password",
    message: "8 to 40 characters must contains uppercase letters and numbers",
  },
};

export class AdminProfile extends Component {
  admin: IUser;
  formValidator: {};

  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.admin = Extract(ADMIN);
    this.render({ ...this.admin });
    this.formValidator = new FormValidator(
      this.getElementsByTagName("form")[0],
      formFields,
      (props) => {
        console.log(props);
        Confirm(
          { title: "Are you sure?", text: "Update profile?" },
          this.btnBack
        );
      }
    );
  }

  // updateProfile = <T>(e: T): void => {
  //   e.preventDefault();
  //   Confirm({ title: "Are you sure?", text: "Update profile?" }, this.btnBack);
  // };

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
