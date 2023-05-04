import { Component } from "../../core/Component";
import { TEventTarget, TRecord } from "../../core/config/types";

export enum MATCH {
  PHONE = "phone", // телефон в формате +78217348374, '+' - не обязателен
  EMAIL = "email", // стандартный email
  PASSWORD = "password", // символы в разных регистрах и цифры
}

export type TFormValidatorConfig = {
  [key: string]: {
    required?: boolean; // true - обязательное поле
    firstUC?: boolean; // true - первая буква станет заглавной
    minLength?: number; // минимальная длина
    maxLength?: number; // максимальная длина (автоматическая обрезка)
    match?: MATCH; // тип поля для валидации
    message?: string; // сообщение при неверном вводе
    compare?: string; // имя поля для сравнения (например для подтверждения пароля)
    filter?: unknown; // регулярное выражение, удалится все, что описано
  };
};

export class FormValidator extends Component {
  private _config: TFormValidatorConfig;
  private _form: HTMLFormElement;

  constructor() {
    super();
  }

  propsChanged() {
    if (this.props) {
      const form = this.getElementsByTagName("form")[0];
      if (form && !!this.props.fields) {
        this._validateForm(form, <TFormValidatorConfig>this.props.fields);
      }
    }
  }

  private _validateForm = (
    form: HTMLFormElement,
    config: TFormValidatorConfig
  ): void => {
    this._config = config;
    this._form = form;

    for (const field in this._config) {
      if (!this._form[field]) {
        throw new Error(
          `FormValidator: the form does not contain a field - ${field}`
        );
      } else {
        const spanError = document.createElement("div");
        spanError.textContent = this._config[field].message;
        spanError.className = "error-message";

        this._form[field].parentNode.insertBefore(spanError, this._form[field]);

        this._form[field]["showError"] = function () {
          this.previousSibling.style.display = "block";
        };

        this._form[field]["hideError"] = function () {
          this.previousSibling.style.display = "none";
        };

        this._form[field]["onblur"] = this._hideError;
        this._form[field]["onfocus"] = this._showError;

        this._form[field]["oninput"] = this._onChange;

        if (this._config[field].required) {
          this._form[field]["valid"] = !!this._form[field]["value"].length;
        } else {
          this._form[field]["valid"] = true;
        }
      }
    }
    this._form["onsubmit"] = this._formSubmit;
    this._form["onreset"] = this._formReset;
  };

  private _hideError(e: TEventTarget): void {
    e.target.hideError();
  }

  private _showError(e: TEventTarget): void {
    e.target.showError();
  }

  private _formReset = (e: SubmitEvent): void => {
    e.preventDefault();
    this.createEvent("validated", false);
  };

  private _formSubmit = (e: SubmitEvent): void => {
    e.preventDefault();
    let valid = true;
    const result: TRecord = {};
    for (const field in this._config) {
      result[field] = this._form[field]["value"];
      if (!this._form[field]["valid"]) {
        this._form[field].classList.add("error");
        valid = false;
      } else {
        this._form[field].classList.remove("error");
        this._form[field].classList.add("success");
      }
    }
    if (valid) {
      this.createEvent("validated", result);
    }
  };

  private _onChange = (e: TEventTarget): void => {
    const field = e.target;
    let error = false;

    // Первая буква должна быть заглавной
    if (this._config[field.name].firstUC) {
      field.value = field.value.replace(/(^|\s)\S$/g, (u: string) =>
        u.toUpperCase()
      );
    }

    // очистка фильтром
    if (this._config[field.name].filter) {
      field.value = field.value.replace(this._config[field.name].filter, "");
    }

    // минимальная длина
    if (
      this._config[field.name].minLength &&
      field.value.length < this._config[field.name].minLength
    ) {
      error = true;
    }

    // максимальная длина
    if (
      this._config[field.name].maxLength &&
      field.value.length > this._config[field.name].maxLength
    ) {
      field.value = field.value.substring(
        0,
        this._config[field.name].maxLength
      );
    }

    // required
    if (this._config[field.name].required && !field.value.length) {
      error = true;
    }

    // compare
    if (
      this._config[field.name].compare &&
      field.value !== this._form[this._config[field.name].compare].value
    ) {
      error = true;
    }

    // match проверка стандартных типов
    if (this._config[field.name].match) {
      const match = this._config[field.name].match;
      switch (true) {
        case match === MATCH.EMAIL:
          if (
            !field.value.match(
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            )
          ) {
            error = true;
          }
          break;
        case match === MATCH.PASSWORD:
          if (!field.value.match(/^(?=.*\d)(?=.*[A-Z])\S+$/m)) {
            error = true;
          }
          break;
        case match === MATCH.PHONE:
          if (!field.value.match(/^(?:\+|\d)[0-9]*$/m)) {
            error = true;
          }
          break;
      }
    }

    field.valid = !error;

    if (error) {
      field.showError();
      field.classList.add("error");
      field.classList.remove("success");
    } else {
      field.hideError();
      field.classList.remove("error");
      if (field.value.length > 0) {
        field.classList.add("success");
      }
    }
  };
}
