import { Component } from "../../core/Component";
import { MATCH } from "../../core/FormValidator";

export class FormValidator extends Component {
  config: unknown;
  form: unknown;

  constructor() {
    super();
  }

  connectedCallback() {
    this.getProps.then((props) => {
      // найдем форму
      const form = this.getElementsByTagName("form")[0];
      console.log(form);
      // если форма есть, то начинаем работать
      if (form && !!props) {
        this.validateForm(form, props);
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

        // так надо чтобы потом можно было снять обработчики
        this.form[field].addEventListener("blur", this.hideError);
        this.form[field].addEventListener("focus", this.showError);

        // обработчик события input
        this.form[field].addEventListener("input", this.onChange);

        if (this.config[field].required) {
          this.form[field].valid = !!this.form[field].value.length;
        } else {
          this.form[field].valid = true;
        }
      }
    }
    // на форму тоже обработчики submit и reset
    this.form.addEventListener("submit", this.formSubmit);
    this.form.addEventListener("reset", this.formReset);
  };

  private hideError<T>(e: T): void {
    e.target.hideError();
  }

  private showError<T>(e: T): void {
    e.target.showError();
  }

  private formReset = <T>(e: T): void => {
    e.preventDefault();
    this.removeListeners();
    this.createEvent("ssubmit", false);
  };

  private formSubmit = <T>(e: T): void => {
    e.preventDefault();
    let valid = true;
    const result: object = {};
    for (const field in this.config) {
      result[field] = this.form[field].value;
      if (!this.form[field].valid) {
        this.form[field].classList.add("validated");
        valid = false;
      }
    }
    if (valid) {
      this.removeListeners();
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

    // match
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

  private removeListeners = () => {
    console.log("validator: remove listeners");
    for (const field in this.config) {
      this.form[field].removeEventListener("blur", this.hideError);
      this.form[field].removeEventListener("focus", this.showError);
      this.form[field].removeEventListener("input", this.onChange);
    }
    this.form.removeEventListener("submit", this.formSubmit);
    this.form.removeEventListener("reset", this.formReset);
  };
}
