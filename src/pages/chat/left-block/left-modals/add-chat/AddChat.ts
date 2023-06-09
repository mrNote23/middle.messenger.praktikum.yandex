import view from "./AddChat.hbs";
import { ModalWindow } from "../../../../../shared/modal-window/ModalWindow";
import { TFormValidatorConfig } from "../../../../../shared/form-validator/FormValidator";
import { ChatController } from "../../../../../core/controllers/ChatController";
import "./AddChat.scss";

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

  modalWindow.node.querySelector<HTMLInputElement>(".form-control").focus();

  function formValidated(e: CustomEvent): void {
    ChatController.addChat(e.detail.chat_name);
    modalWindow.remove();
  }
};
