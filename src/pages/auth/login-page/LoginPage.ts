import view from "./LoginPage.hbs";
import { Component } from "../../../core/Component";
import ChatApp from "../../../core/ChatApp";
import { TFormValidatorConfig } from "../../../shared/form-validator/FormValidator";
import { formFields } from "./formFields";
import "../auth.scss";

export class LoginPage extends Component {
  formFields: TFormValidatorConfig;
  error: HTMLElement;

  constructor() {
    super(view);
    this.formFields = formFields;
  }

  loginError = (e) => {
    this.error.textContent = e.reason;
    this.error.style.display = "block";
  };

  formValidated = (e: CustomEvent): void => {
    this.error.style.display = "none";
    ChatApp.login(e.detail, this.loginError);
  };

  connected(): void {
    this.render();
    this.error = this.querySelector(".auth-error");
  }
}
