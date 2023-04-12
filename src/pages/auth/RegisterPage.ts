import view from "./RegisterPage.hbs";
import { Component } from "../../core/Component";
import {
  FormValidator,
  MATCH,
  TFormValidatorConfig,
} from "../../core/FormValidator";
import Chat from "../../core/ChatApp";
import "./auth.scss";

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
  password: {
    required: true,
    match: MATCH.PASSWORD,
    minLength: 8,
    maxLength: 40,
    message: "8 to 40 characters must contains uppercase letters and numbers",
  },
  confirm_password: {
    required: true,
    maxLength: 40,
    compare: "password",
    message: "passwords must match",
  },
};

export class RegisterPage extends Component {
  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.render();
    new FormValidator(
      this.getElementsByTagName("form")[0],
      formFields,
      Chat.register
    );
  }
}
