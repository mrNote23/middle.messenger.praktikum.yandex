import State from "./State";
import { ModalWindowComponent } from "../shared/modal-window/ModalWindow";
import { FormValidator } from "../shared/form-validator/FormValidator";
import AuthApi from "./API/AuthApi";
import WS from "./services/WS";
import { pathToAvatar } from "../utils/path-to-avatar";
import {
  ADMIN,
  LAST_MESSAGE_TIME,
  LEFTMODE,
  NEW_MESSAGE,
  RIGHTMODE,
  STATES,
  TOKEN,
} from "./config/types";

class ChatApp {
  tmpMessages = [];

  constructor() {
    customElements.define("form-validator", FormValidator);
    customElements.define("modal-window", ModalWindowComponent);
  }

  start = () => {
    window.addEventListener("popstate", <T>(e: T) => {
      this.navigate(e.currentTarget.location.pathname, false);
    });

    const url = window.location.pathname;

    if (["/", "/login", "/register"].includes(url)) {
      AuthApi.profile()
        .then((res) => {
          State.store(ADMIN, { ...pathToAvatar(res), role: "admin" });
          this.navigate("/");
        })
        .catch(() => {
          if (url === "/") {
            this.navigate("/login");
          } else {
            this.navigate(url);
          }
        });
    }
  };

  init = () => {
    State.store(ADMIN, null);
    State.store(TOKEN, null);
    State.store(NEW_MESSAGE, null);
    State.store(LAST_MESSAGE_TIME, null);
    State.store(STATES.CHATS_LIST, null); // Список чатов (IChat[])
    State.store(STATES.CURRENT_CHAT, null); // текущий чат (IChat)
    State.store(STATES.CURRENT_USER, null); // текущий пользователь чата (IUser)
    State.store(STATES.CHAT_USERS, []); // пользователи текущего чата (IUser[])
    State.store(STATES.CHAT_MESSAGES, []); // сообщения текущего чата

    State.store(STATES.LEFT_MODE, LEFTMODE.CHATS); // режим левой панели ( chats/users )
    State.store(STATES.RIGHT_MODE, RIGHTMODE.CHAT); // режим правой панели (chat/adminProfile/userProfile/chatProfile)
    WS.init();
  };

  navigate = (path: string, pushState = true): void => {
    const router = document.getElementById("root-router");
    if (router) {
      router.props.path = path;
      router.setAttribute("path", path);
      pushState && window.history.pushState({}, "", path);
    }
  };
}

export default new ChatApp();
