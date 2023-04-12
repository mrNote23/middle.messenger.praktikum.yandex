import view from "./AddUser.hbs";
import "./AddUser.scss";
import { ModalWindow } from "../../../../ui/modal-window/ModalWindow";
import {
  FormValidator,
  TFormValidatorConfig,
} from "../../../../core/FormValidator";

const formFields: TFormValidatorConfig = {
  email: {
    required: true,
    match: "email",
    maxLength: 50,
    message: "correct email address (ivan@mail.ru)",
  },
  phone: {
    required: true,
    minLength: 10,
    maxLength: 15,
    match: "phone",
    message: "phone number in the format +79615432367",
  },
};

export const AddUser = (): void => {
  const modalWindow = new ModalWindow("Add user", view());

  new FormValidator(
    document.getElementsByTagName("form")[0],
    formFields,
    (props) => {
      props && console.log(props);
      modalWindow.remove();
    }
  );
};
