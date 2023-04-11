export type TFormValidatorConfig = {
  [key: string]: {
    required?: boolean;
    firstUC?: boolean;
    minLength?: number;
    maxLength?: number;
    match?: string;
    message?: string;
    compare?: string;
  };
};

export class FormValidator {
  constructor(
    private form: object,
    private config: TFormValidatorConfig,
    private cb: (props: any) => any
  ) {
    if (!form) {
      throw new Error("FormValidator: form does not exist");
    }

    for (let field in config) {
      if (!this.form[field]) {
        throw new Error(
          `FormValidator: the form does not contain a field - ${field}`
        );
      } else {
        let spanError = document.createElement("div");
        spanError.textContent = this.config[field].message;
        spanError.className = "error-message";
        this.form[field].parentNode.insertBefore(spanError, this.form[field]);
        this.form[field].showError = function () {
          this.previousSibling.style.display = "block";
        };
        this.form[field].hideError = function () {
          this.previousSibling.style.display = "none";
        };

        this.form[field].addEventListener("blur", function () {
          this.hideError();
        });
        this.form[field].addEventListener("focus", function () {
          this.classList.contains("error") && this.showError();
        });

        this.form[field].addEventListener("input", this.onChange);
        if (config[field].required) {
          this.form[field].valid = false;
        } else {
          this.form[field].valid = true;
        }
      }
    }
    this.form.addEventListener("submit", this.formSubmit);
  }

  formSubmit = <T>(e: T): void => {
    e.preventDefault();
    let valid: boolean = true;
    const result: object = {};
    for (let field in this.config) {
      result[field] = this.form[field].value;
      if (!this.form[field].valid) {
        this.form[field].classList.add("error");
        valid = false;
      }
    }
    if (valid) {
      this.cb(result);
    }
  };

  onChange = <T>(e: T): void => {
    let field = e.target;
    let error = false;

    if (this.config[field.name].firstUC) {
      field.value = field.value.replace(/(^|\s)\S/g, (u) => u.toUpperCase());
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
        case match === "email":
          if (
            !field.value.match(
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            )
          ) {
            error = true;
          }
          break;
        case match === "password":
          if (!field.value.match(/^(?=.*\d)(?=.*[A-Z])\S+$/m)) {
            error = true;
          }
          break;
        case match === "phone":
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
