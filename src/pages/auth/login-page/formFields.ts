import { TFormValidatorConfig } from "../../../shared/form-validator/FormValidator";

export const formFields: TFormValidatorConfig = {
  login: {
    required: true,
    minLength: 3,
    maxLength: 20,
    filter: /[^а-яa-z0-9-]+/gi,
    message: "3 to 20 characters, letters, numbers, '-'",
  },
  password: {
    required: true,
    minLength: 8,
    maxLength: 40,
    message: "8 to 40 characters",
  },
};
