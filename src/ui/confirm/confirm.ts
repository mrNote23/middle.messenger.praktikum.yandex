import view from "./confirm.hbs";
import { ModalWindow } from "../modal-window/ModalWindow";

type TConfirmProps = {
  title: string;
  [key: string]: string;
};

export const Confirm = (props: TConfirmProps, cb: () => void): void => {
  const modalWindow = new ModalWindow(props.title, view({ ...props }), {
    clickYes,
    clickNo,
  });

  function clickYes() {
    console.log("yes");
    modalWindow.remove();
    cb();
  }

  function clickNo() {
    console.log("no");
    modalWindow.remove();
  }
};
