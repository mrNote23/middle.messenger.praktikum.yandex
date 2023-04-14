import view from "./AddUser.hbs";
import { ModalWindow } from "../../../../ui/modal-window/ModalWindow";
import {
  MATCH,
  TFormValidatorConfig,
} from "../../../../ui/form-validator/FormValidator";
import "./AddUser.scss";

export const AddUser = (): void => {
  const formFields: TFormValidatorConfig = {
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
  };
  const modalWindow = new ModalWindow("Add user", view(), {
    formFields,
    formValidated,
  });

  function formValidated(e: CustomEvent): void {
    console.log(e.detail);
    modalWindow.remove();
  }
};
