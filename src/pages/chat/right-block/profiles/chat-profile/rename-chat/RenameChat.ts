import view from "./RenameChat.hbs";
import { ModalWindow } from "../../../../../../shared/modal-window/ModalWindow";
import State from "../../../../../../core/State";
import { STATES } from "../../../../../../core/ChatApp";
import { TFormValidatorConfig } from "../../../../../../shared/form-validator/FormValidator";
import "./RenameChat.scss";

export const RenameChat = (): void => {
  const formFields: TFormValidatorConfig = {
    chat_name: {
      required: true,
      minLength: 3,
      maxLength: 50,
      filter: /[^а-яa-z0-9\-\s]+/gi,
      message: "3 to 50 characters, letters, numbers, '-'",
    },
  };

  const currentChat = State.extract(STATES.CURRENT_CHAT);

  const modalWindow = new ModalWindow(
    "Rename chat",
    view({ chatTitle: currentChat.title }),
    {
      formFields,
      formValidated,
    }
  );

  function formValidated(): void {
    modalWindow.remove();
  }
};
