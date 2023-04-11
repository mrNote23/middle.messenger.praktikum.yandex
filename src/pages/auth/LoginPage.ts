import view from "./LoginPage.hbs";
import { Component } from "../../core/Component";
import { navigate } from "../../ui/main-router/MainRouter";
import "./auth.scss";
import { FormValidator } from "../../core/FormValidator";

const formFields = {
  login: {
    rules: [],
  },
  password: {
    rules: [],
  },
};

export class LoginPage extends Component {
  formValidator: any;

  constructor() {
    super(view);
    this.formValidator = new FormValidator(formFields);
  }

  validateField = (e) => {
    this.formValidator.event(e);
  };

  submitForm = <T>(e: T): void => {
    e.preventDefault();

    // navigate("/");
  };

  connectedCallback(): void {
    this.render();
  }
}
