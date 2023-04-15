import {
  MATCH,
  TFormValidatorConfig,
} from "../../../../../shared/form-validator/FormValidator";

export const formFields: TFormValidatorConfig = {
  first_name: {
    required: true,
    firstUC: true,
    maxLength: 50,
    filter: /[^а-яa-z-]+/gi,
    message: "letters only (no spaces) or '-'",
  },
  second_name: {
    required: true,
    firstUC: true,
    maxLength: 50,
    filter: /[^а-яa-z-]+/gi,
    message: "letters only (no spaces) or '-'",
  },
  display_name: {
    required: true,
    maxLength: 20,
    filter: /[^а-яa-z-]+/gi,
    message: "letters only (no spaces) or '-'",
  },
  login: {
    required: true,
    minLength: 3,
    maxLength: 20,
    filter: /[^а-яa-z0-9-]+/gi,
    message: "3 to 20 characters, letters, numbers, '-'",
  },
  email: {
    required: true,
    match: MATCH.EMAIL,
    maxLength: 50,
    message: "correct email address (ivan@mail.ru)",
  },
  phone: {
    required: true,
    minLength: 10,
    maxLength: 15,
    match: MATCH.PHONE,
    filter: /[^+0-9]+/gi,
    message: "phone number in the format +79615432367",
  },
  oldPassword: {
    match: MATCH.PASSWORD,
    minLength: 8,
    maxLength: 40,
    message: "8 to 40 characters must contains uppercase letters and numbers",
  },
  newPassword: {
    minLength: 8,
    maxLength: 40,
    match: MATCH.PASSWORD,
    message: "8 to 40 characters must contains uppercase letters and numbers",
  },
};
