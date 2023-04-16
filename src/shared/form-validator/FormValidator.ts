import { Component, TProps } from "../../core/Component";

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
  config: unknown;
  form: unknown;

  constructor() {
    super();
  }

  connected() {
    this.getProps.then((props: TProps) => {
      // найдем форму
      const form = this.getElementsByTagName("form")[0];
      // если форма есть, то начинаем работать
      if (form && !!props.fields) {
        this.validateForm(form, props.fields);
      }
    });
  }

  private validateForm = (_form, _config): void => {
    this.config = _config;
    this.form = _form;
    // проверка, что все поля описанные в конфиге, есть в форме
    for (const field in this.config) {
      if (!this.form[field]) {
        throw new Error(
          `FormValidator: the form does not contain a field - ${field}`
        );
      } else {
        // создадим span для вывода сообщений об ошибках ввода
        const spanError = document.createElement("div");
        spanError.textContent = this.config[field].message;
        spanError.className = "error-message";
        // прикрепим его перед каждым элементом формы
        this.form[field].parentNode.insertBefore(spanError, this.form[field]);
        // создадим для элементов формы методы включения и выключения спана
        this.form[field].showError = function () {
          this.previousSibling.style.display = "block";
        };
        this.form[field].hideError = function () {
          this.previousSibling.style.display = "none";
        };

        this.form[field]["onblur"] = this.hideError;
        this.form[field]["onfocus"] = this.showError;

        // обработчик события input
        this.form[field]["oninput"] = this.onChange;

        if (this.config[field].required) {
          this.form[field].valid = !!this.form[field].value.length;
        } else {
          this.form[field].valid = true;
        }
      }
    }
    this.form["onsubmit"] = this.formSubmit;
    this.form["onreset"] = this.formReset;
  };

  // скрыть ошибку ввода
  private hideError<T>(e: T): void {
    e.target.hideError();
  }

  // показать ошибку ввода
  private showError<T>(e: T): void {
    e.target.showError();
  }

  // форма сброшена, отказ от воода
  private formReset = <T>(e: T): void => {
    e.preventDefault();
    this.createEvent("validated", false);
  };

  // сабмит формы
  private formSubmit = <T>(e: T): void => {
    e.preventDefault();
    let valid = true;
    const result: object = {};
    for (const field in this.config) {
      result[field] = this.form[field].value;
      if (!this.form[field].valid) {
        this.form[field].classList.add("error");
        valid = false;
      } else {
        this.form[field].classList.remove("error");
        this.form[field].classList.add("success");
      }
    }
    if (valid) {
      this.createEvent("validated", result);
    }
  };

  private onChange = <T>(e: T): void => {
    const field = e.target;
    let error = false;

    // Первая буква должна быть заглавной
    if (this.config[field.name].firstUC) {
      field.value = field.value.replace(/(^|\s)\S$/g, (u) => u.toUpperCase());
    }

    // очистка фильтром
    if (this.config[field.name].filter) {
      field.value = field.value.replace(this.config[field.name].filter, "");
    }

    // минимальная длина
    if (
      this.config[field.name].minLength &&
      field.value.length < this.config[field.name].minLength
    ) {
      error = true;
    }

    // максимальная длина
    if (
      this.config[field.name].maxLength &&
      field.value.length > this.config[field.name].maxLength
    ) {
      field.value = field.value.substring(0, this.config[field.name].maxLength);
    }

    // required
    if (this.config[field.name].required && !field.value.length) {
      error = true;
    }

    // compare
    if (
      this.config[field.name].compare &&
      field.value !== this.form[this.config[field.name].compare].value
    ) {
      error = true;
    }

    // match проверка стандартных типов
    if (this.config[field.name].match) {
      const match = this.config[field.name].match;
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
