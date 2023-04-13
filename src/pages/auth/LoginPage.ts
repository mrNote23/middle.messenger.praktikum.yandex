import view from "./LoginPage.hbs";
import { Component } from "../../core/Component";
import "./auth.scss";
import { FormValidator } from "../../core/FormValidator";
import ChatApp from "../../core/ChatApp";

const formFields = {
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

export class LoginPage extends Component {
  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.render();
    new FormValidator(
      this.getElementsByTagName("form")[0],
      formFields,
      ChatApp.login
    );
  }
}
