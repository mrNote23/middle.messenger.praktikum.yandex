import view from "../add-chat/AddChat.hbs";
import "./AddChat.scss";
import { ModalWindow } from "../../../../core/components/modal-window/ModalWindow";

export const AddChat = (): void => {
  const modalWindow = new ModalWindow("Add new chat", view());

  const submitForm = (e: SubmitEvent): void => {
    e.preventDefault();
    e.target.removeEventListener("submit", submitForm);
    modalWindow.remove();
  };

  document
    .getElementById("add-chat-form")
    .addEventListener("submit", submitForm);
};
