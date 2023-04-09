import view from "./AddUser.hbs";
import "./AddUser.scss";
import { ModalWindow } from "../../../../core/components/modal-window/ModalWindow";

export const AddUser = (): void => {
  const modalWindow = new ModalWindow("Add user", view());

  const submitForm = (e: SubmitEvent): void => {
    console.log(e);
    e.preventDefault();
    e.target.removeEventListener("submit", submitForm);
    modalWindow.remove();
  };

  document
    .getElementById("add-user-form")
    .addEventListener("submit", submitForm);
};
