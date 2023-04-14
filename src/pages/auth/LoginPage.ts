import view from "./LoginPage.hbs";
import { Component } from "../../core/Component";
import ChatApp from "../../core/ChatApp";
import { TFormValidatorConfig } from "../../ui/form-validator/FormValidator";
import "./auth.scss";

export class LoginPage extends Component {
  formFields: TFormValidatorConfig = {
    login: {
      required: true,
      minLength: 3,
      maxLength: 20,
      filter: /[^а-яa-z0-9-]+/gi,
      message: "3 to 20 characters, letters, numbers, '-'",
    },
    password: {
      required: true,
      minLength: 8,
      maxLength: 40,
      message: "8 to 40 characters",
    },
  };

  constructor() {
    super(view);
    this.classList.add("wrapper");
  }

  formValidated = (e: CustomEvent): void => {
    ChatApp.login(e.detail);
  };

  connected(): void {
    this.render();
    console.log("connected");
  }

  disconnected() {
    console.log("component disconnected");
  }
}
