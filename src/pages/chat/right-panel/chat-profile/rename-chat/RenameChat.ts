import view from "./RenameChat.hbs";
import "./RenameChat.scss";
import { ModalWindow } from "../../../../../ui/modal-window/ModalWindow";
import {
  FormValidator,
  TFormValidatorConfig,
} from "../../../../../core/FormValidator";
import { Dispatch, Extract } from "../../../../../core/State";
import { STATES } from "../../../../../core/Chat";

const formFields: TFormValidatorConfig = {
  chat_name: {
    required: true,
    minLength: 10,
    maxLength: 50,
    filter: /[^а-яa-z0-9\-\s]+/gi,
    message: "10 to 50 characters, letters, numbers, '-'",
  },
};

export const RenameChat = (): void => {
  const currentChat = Extract(STATES.CURRENT_CHAT);

  const modalWindow = new ModalWindow(
    "Rename chat",
    view({ chatTitle: currentChat.title })
  );

  new FormValidator(
    document.getElementsByTagName("form")[0],
    formFields,
    (props) => {
      if (props && props.chat_name !== currentChat.title) {
        console.log(props);

        Dispatch(
          STATES.CHATS_LIST,
          Extract(STATES.CHATS_LIST).map((elm) => {
            if (elm.id === currentChat.id) {
              return { ...elm, title: props.chat_name };
            } else {
              return elm;
            }
          })
        );
        Dispatch(STATES.CURRENT_CHAT, {
          ...Extract(STATES.CURRENT_CHAT),
          title: props.chat_name,
        });
      }
      modalWindow.remove();
    }
  );
};
