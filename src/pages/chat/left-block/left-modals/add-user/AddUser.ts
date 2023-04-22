import view from "./AddUser.hbs";
import { ModalWindow } from "../../../../../shared/modal-window/ModalWindow";
import { TFormValidatorConfig } from "../../../../../shared/form-validator/FormValidator";
import "./AddUser.scss";
import ChatApp from "../../../../../core/ChatApp";

export const AddUser = (): void => {
  const formFields: TFormValidatorConfig = {
    login: {
      required: true,
      maxLength: 50,
      message: "up to 50 characters",
    },
  };
  const modalWindow = new ModalWindow("Add user", view(), {
    formFields,
    formValidated,
  });

  modalWindow.node["error"] = function (error: string) {
    const tmp = this.querySelector(".modal-error");
    tmp.textContent = error;
    tmp.style.display = "block";
    setTimeout(() => {
      tmp.style.display = "none";
    }, 3000);
  };

  function formValidated(e: CustomEvent): void {
    ChatApp.searchUser(e.detail.login).then((res) => {
      const user = res.find((elm) => elm.login === e.detail.login);
      if (user) {
        ChatApp.addUser(user);
        modalWindow.remove();
      } else {
        modalWindow.node["error"]("User not found");
      }
    });
  }
};
