import view from "./RegisterPage.hbs";
import { Component } from "../../../core/Component";
import ChatApp from "../../../core/ChatApp";
import { TFormValidatorConfig } from "../../../shared/form-validator/FormValidator";
import { formFields } from "./formFields";
import "../auth.scss";

export class RegisterPage extends Component {
  formFields: TFormValidatorConfig;
  error: HTMLElement;

  constructor() {
    super(view);
    this.formFields = formFields;
  }

  registerError = (e) => {
    this.error.textContent = e.reason;
    this.error.style.display = "block";
  };

  formValidated = (e: CustomEvent): void => {
    this.error.style.display = "none";
    ChatApp.register(e.detail, this.registerError);
  };

  connected(): void {
    this.render();
    this.error = this.querySelector(".auth-error");
  }
}
