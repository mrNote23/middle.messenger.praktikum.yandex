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
      minLength: 10,
      maxLength: 50,
      filter: /[^а-яa-z0-9\-\s]+/gi,
      message: "10 to 50 characters, letters, numbers, '-'",
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

  function formValidated(e: CustomEvent): void {
    console.log(e.detail);
    modalWindow.remove();
  }
};
