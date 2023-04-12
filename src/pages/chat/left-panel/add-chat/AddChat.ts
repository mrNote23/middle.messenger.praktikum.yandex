import view from "./AddChat.hbs";
import "./AddChat.scss";
import { ModalWindow } from "../../../../ui/modal-window/ModalWindow";
import {
  FormValidator,
  TFormValidatorConfig,
} from "../../../../core/FormValidator";

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

export const AddChat = (): void => {
  const modalWindow = new ModalWindow("Add new chat", view());

  new FormValidator(
    document.getElementsByTagName("form")[0],
    formFields,
    (props) => {
      props && console.log(props);
      modalWindow.remove();
    }
  );
};
