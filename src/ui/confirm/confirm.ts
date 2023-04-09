import view from "./confirm.hbs";
import { ModalWindow } from "../../core/components/modal-window/ModalWindow";

type TConfirmProps = {
  title: string;
  [key: string]: any;
};

export const Confirm = (props: TConfirmProps, cb: object): void => {
  const modalWindow = new ModalWindow(props.title, view({ ...props }));

  const submitForm = (e) => {
    e.preventDefault();
    e.target.removeEventListener("submit", submitForm);
    modalWindow.remove();
    cb.call();
  };

  const resetForm = (e) => {
    e.preventDefault();
    e.target.removeEventListener("reset", resetForm);
    modalWindow.remove();
  };

  document
    .getElementById("confirm-form")
    .addEventListener("submit", submitForm);

  document.getElementById("confirm-form").addEventListener("reset", resetForm);
};
