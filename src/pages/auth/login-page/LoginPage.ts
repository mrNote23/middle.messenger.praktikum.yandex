import view from "./LoginPage.hbs";
import { Component } from "../../../core/Component";
import { TFormValidatorConfig } from "../../../shared/form-validator/FormValidator";
import { formFields } from "./formFields";
import { AuthController } from "../../../core/controllers/AuthController";
import "../auth.scss";
import { TError } from "../../../core/config/types";

export class LoginPage extends Component {
  formFields: TFormValidatorConfig;
  private _error: HTMLElement;

  constructor() {
    console.log();
    super(view);
    this.formFields = formFields;
    this.className = "wrapper";
  }

  loginError = (e: TError): void => {
    this._error.textContent = e.reason;
    this._error.style.display = "block";
  };

  formValidated = async (e: CustomEvent) => {
    this._error.style.display = "none";
    await AuthController.login(e.detail, this.loginError);
  };

  connected() {
    this.render();
    this._error = this.querySelector(".auth-error");
  }
}
