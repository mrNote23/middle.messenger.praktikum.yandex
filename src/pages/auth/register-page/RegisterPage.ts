import view from "./RegisterPage.hbs";
import { Component } from "../../../core/Component";
import ChatApp from "../../../core/ChatApp";
import { TFormValidatorConfig } from "../../../shared/form-validator/FormValidator";
import { formFields } from "./formFields";
import "../auth.scss";

export class RegisterPage extends Component {
  formFields: TFormValidatorConfig;

  constructor() {
    super(view);
    this.formFields = formFields;
  }

  formValidated = (e: CustomEvent): void => {
    ChatApp.register(e.detail);
  };

  connected(): void {
    this.render();
  }
}
