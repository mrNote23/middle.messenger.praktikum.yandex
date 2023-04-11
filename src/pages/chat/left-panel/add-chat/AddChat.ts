import view from "./AddChat.hbs";
import "./AddChat.scss";
import { ModalWindow } from "../../../../ui/modal-window/ModalWindow";

export const AddChat = (): void => {
  const modalWindow = new ModalWindow("Add new chat", view());

  const submitForm = <T>(e: T): void => {
    e.preventDefault();
    e.target.removeEventListener("submit", submitForm);
    modalWindow.remove();
  };

  document
    .getElementById("add-chat-form")
    .addEventListener("submit", submitForm);
};
