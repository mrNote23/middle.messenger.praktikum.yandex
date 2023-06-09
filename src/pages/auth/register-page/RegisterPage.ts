import view from "./RegisterPage.hbs";
import { Component } from "../../../core/Component";
import { TFormValidatorConfig } from "../../../shared/form-validator/FormValidator";
import { formFields } from "./formFields";
import { AuthController } from "../../../core/controllers/AuthController";
import "../auth.scss";
import { TError } from "../../../core/config/types";

export class RegisterPage extends Component {
  formFields: TFormValidatorConfig;
  private _error: HTMLElement;

  constructor() {
    super(view);
    this.formFields = formFields;
    this.className = "wrapper";
  }

  registerError = (e: TError) => {
    this._error.textContent = e.reason;
    this._error.style.display = "block";
  };

  formValidated = async (e: CustomEvent) => {
    this._error.style.display = "none";
    await AuthController.register(e.detail, this.registerError);
  };

  connected() {
    this.render();
    this._error = this.querySelector(".auth-error");
  }
}
