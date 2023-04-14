import view from "./AddChat.hbs";
import "./AddChat.scss";
import { ModalWindow } from "../../../../ui/modal-window/ModalWindow";
import { TFormValidatorConfig } from "../../../../ui/form-validator/FormValidator";

export const AddChat = (): void => {
  const formFields: TFormValidatorConfig = {
    chat_name: {
      required: true,
      firstUC: true,
      minLength: 10,
      maxLength: 50,
      filter: /[^а-яa-z0-9\-\s]+/gi,
      message: "10 to 50 characters, letters, numbers, '-'",
    },
  };
  const modalWindow = new ModalWindow("Add new chat", view(), {
    formFields,
    formValidated,
  });

  function formValidated(e: CustomEvent): void {
    console.log(e.detail);
    modalWindow.remove();
  }
};
