import view from "./AdminProfile.hbs";
import State from "../../../../core/State";
import { OnMobile } from "../../../../utils/on-mobile";
import { Confirm } from "../../../../ui/confirm/confirm";
import { Component } from "../../../../core/Component";
import ChatApp, {
  ADMIN,
  LEFTMODE,
  RIGHTMODE,
  STATES,
} from "../../../../core/ChatApp";
import {
  FormValidator,
  MATCH,
  TFormValidatorConfig,
} from "../../../../core/FormValidator";

const formFields: TFormValidatorConfig = {
  first_name: {
    required: true,
    firstUC: true,
    maxLength: 50,
    filter: /[^а-яa-z-]+/gi,
    message: "letters only (no spaces) or '-'",
  },
  second_name: {
    required: true,
    firstUC: true,
    maxLength: 50,
    filter: /[^а-яa-z-]+/gi,
    message: "letters only (no spaces) or '-'",
  },
  display_name: {
    required: true,
    maxLength: 20,
    filter: /[^а-яa-z-]+/gi,
    message: "letters only (no spaces) or '-'",
  },
  login: {
    required: true,
    minLength: 3,
    maxLength: 20,
    filter: /[^а-яa-z0-9-]+/gi,
    message: "3 to 20 characters, letters, numbers, '-'",
  },
  email: {
    required: true,
    match: MATCH.EMAIL,
    maxLength: 50,
    message: "correct email address (ivan@mail.ru)",
  },
  phone: {
    required: true,
    minLength: 10,
    maxLength: 15,
    match: MATCH.PHONE,
    filter: /[^+0-9]+/gi,
    message: "phone number in the format +79615432367",
  },
  oldPassword: {
    match: MATCH.PASSWORD,
    minLength: 8,
    maxLength: 40,
    message: "8 to 40 characters must contains uppercase letters and numbers",
  },
  newPassword: {
    minLength: 8,
    maxLength: 40,
    match: MATCH.PASSWORD,
    message: "8 to 40 characters must contains uppercase letters and numbers",
  },
};

export class AdminProfile extends Component {
  admin: string | null;

  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.admin = State.extract(ADMIN);
    this.render({ ...this.admin });
    new FormValidator(
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

  btnLogout = (): void => {
    Confirm({ title: "Are you sure?", text: "Exit from chat?" }, () => {
      ChatApp.navigate("/login");
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
