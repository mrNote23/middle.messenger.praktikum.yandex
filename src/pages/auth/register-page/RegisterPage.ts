import view from "./RegisterPage.hbs";
import { Component } from "../../../core/Component";
import { TFormValidatorConfig } from "../../../shared/form-validator/FormValidator";
import { formFields } from "./formFields";
import "../auth.scss";
import { AuthController } from "../../../core/controllers/AuthController";

export class RegisterPage extends Component {
  formFields: TFormValidatorConfig;
  error: HTMLElement;

  constructor() {
    super(view);
    this.formFields = formFields;
    this.className = "wrapper";
  }

  registerError = (e) => {
    this.error.textContent = e.reason;
    this.error.style.display = "block";
  };

  formValidated = (e: CustomEvent): void => {
    this.error.style.display = "none";
    AuthController.register(e.detail, this.registerError);
  };

  connected(): void {
    this.render();
    this.error = this.querySelector(".auth-error");
  }
}
