import view from "./AddUser.hbs";
import { ModalWindow } from "../../../../../shared/modal-window/ModalWindow";
import {
  MATCH,
  TFormValidatorConfig,
} from "../../../../../shared/form-validator/FormValidator";
import "./AddUser.scss";
import ChatApp from "../../../../../core/ChatApp";
import ChatApi from "../../../../../core/ChatApi";

export const AddUser = (): void => {
  const formFields: TFormValidatorConfig = {
    login: {
      required: true,
      maxLength: 50,
      message: "up to 50 characters",
    },
    // email: {
    //   required: true,
    //   match: MATCH.EMAIL,
    //   maxLength: 50,
    //   message: "correct email address (ivan@mail.ru)",
    // },
    // phone: {
    //   required: true,
    //   minLength: 10,
    //   maxLength: 15,
    //   match: MATCH.PHONE,
    //   filter: /[^+0-9]+/gi,
    //   message: "phone number in the format +79615432367",
    // },
  };
  const modalWindow = new ModalWindow("Add user", view(), {
    formFields,
    formValidated,
  });

  modalWindow.node["error"] = function (error: string) {
    const tmp = this.querySelector(".modal-error");
    tmp!.textContent = error;
    tmp!.style.display = "block";
    setTimeout(() => {
      tmp!.style.display = "none";
    }, 3000);
  };

  function formValidated(e: CustomEvent): void {
    ChatApp.searchUser(e.detail.login).then((res) => {
      console.log(res);
      const user = res.find((elm) => elm.login === e.detail.login);
      if (user) {
        ChatApp.addUser(user);
        modalWindow.remove();
      } else {
        modalWindow.node.error("User not found");
      }
    });
  }
};
