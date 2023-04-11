import view from "./LoginPage.hbs";
import { Component } from "../../core/Component";
import "./auth.scss";
import { FormValidator } from "../../core/FormValidator";
import Chat from "../../core/Chat";
import { navigate } from "../../ui/main-router/MainRouter";

const formFields = {
  login: {
    required: true,
    minLength: 3,
    maxLength: 20,
    message: "3 to 20 characters, letters, numbers, '-'",
  },
  password: {
    required: true,
    minLength: 8,
    maxLength: 40,
    message: "8 to 40 characters",
  },
};

export class LoginPage extends Component {
  formValidator: any;

  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.render();
    this.formValidator = new FormValidator(
      this.getElementsByTagName("form")[0],
      formFields,
      Chat.login
    );
  }
}