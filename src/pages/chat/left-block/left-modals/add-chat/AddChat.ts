import view from "./AddChat.hbs";
import "./AddChat.scss";
import { ModalWindow } from "../../../../../shared/modal-window/ModalWindow";
import { TFormValidatorConfig } from "../../../../../shared/form-validator/FormValidator";
import ChatApp from "../../../../../core/ChatApp";

export const AddChat = (): void => {
  const formFields: TFormValidatorConfig = {
    chat_name: {
      required: true,
      minLength: 3,
      maxLength: 50,
      filter: /[^а-яa-z0-9\-\s]+/gi,
      message: "3 to 50 characters, letters, numbers, '-'",
    },
  };
  const modalWindow = new ModalWindow("Add new chat", view(), {
    formFields,
    formValidated,
  });

  function formValidated(e: CustomEvent): void {
    ChatApp.addChat(e.detail.chat_name);
    modalWindow.remove();
  }
};
