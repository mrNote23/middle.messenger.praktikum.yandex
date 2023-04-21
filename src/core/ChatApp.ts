import Api from "./Api";
import State from "./State";
import { IChat, IChatMessage, IChatUsers, IUser } from "./config/interfaces";
import { OnMobile } from "../utils/on-mobile";
import { ModalWindowComponent } from "../shared/modal-window/ModalWindow";
import { FormValidator } from "../shared/form-validator/FormValidator";
import AuthApi from "./AuthApi";
import authApi from "./AuthApi";

export enum STATES {
  CHATS_LIST = "chatsList",
  CURRENT_CHAT = "currentChat",
  CURRENT_USER = "currentUser",
  CHAT_USERS = "chatUsers",
  CHAT_MESSAGES = "chatMessages",
  LEFT_MODE = "leftMode",
  RIGHT_MODE = "rightMode",
}

export enum LEFTMODE {
  CHATS = "/chats",
  USERS = "/users",
}

export enum RIGHTMODE {
  CHAT = "/chat",
  ADMIN_PROFILE = "/adminProfile",
  USER_PROFILE = "/userProfile",
  CHAT_PROFILE = "/chatProfile",
}

export const ADMIN = "admin";

class ChatApp {
  rootRoutes;

  constructor() {
    customElements.define("form-validator", FormValidator);
    customElements.define("modal-window", ModalWindowComponent);
  }

  start = () => {
    window.addEventListener("popstate", <T>(e: T) => {
      this.navigate(e.currentTarget.location.pathname, false);
    });

    this.navigate(window.location.pathname);
  };

  // инициализация стэйта
  init = () => {
    State.store(ADMIN, null);
    State.store(STATES.CHATS_LIST, []); // Список чатов (IChat[])
    State.store(STATES.CURRENT_CHAT, null); // текущий чат (IChat)
    State.store(STATES.CURRENT_USER, null); // текущий пользователь чата (IUser)
    State.store(STATES.CHAT_USERS, []); // пользователи текущего чата (IUser[])
    State.store(STATES.CHAT_MESSAGES, null); // сообщения текущего чата

    State.store(STATES.LEFT_MODE, LEFTMODE.CHATS); // режим левой панели ( chats/users )
    State.store(STATES.RIGHT_MODE, RIGHTMODE.CHAT); // режим правой панели (chat/adminProfile/userProfile/chatProfile)
  };

  // навигация на url
  navigate = (path: string, pushState = true): void => {
    const router = document.getElementById("root-router");
    if (router) {
      router.setAttribute("path", path);
      pushState && window.history.pushState({}, "", path);
    }
  };

  // логин пользователя
  async login<T>(props: T, cbError: (e: object) => void) {
    try {
      await AuthApi.logout().catch((e) => false);
      await AuthApi.login(props).then(async (r) => {
        const res = await AuthApi.profile();
        localStorage.setItem("authorized", "true");
        this.init();
        State.store(ADMIN, { ...res, role: "admin" });
        this.navigate("/");
      });
    } catch (e) {
      cbError(e);
    }
  }

  // logout
  async logout() {
    await AuthApi.logout().catch((e) => false);
    localStorage.removeItem("authorized");
    this.navigate("/login");
    State.clear();
  }

  // регистрация пользователя
  async register<T>(props: T, cbError: (e: object) => void) {
    try {
      await AuthApi.logout().catch((e) => false);
      await AuthApi.register(props).then(async (r) => {
        const res = await AuthApi.profile();
        this.init();
        State.store(ADMIN, { ...res, role: "admin" });
        this.navigate("/");
      });
    } catch (e) {
      cbError(e);
    }
  }

  // загрузка списка чатов
  loadChatsList = (): void => {
    Api.getChats()
      .then((list) => {
        list.length && State.dispatch(STATES.CHATS_LIST, list);
      })
      .catch();
  };

  // выбор текущего пользователя
  setCurrentUser = (user: IUser): void => {
    State.dispatch(STATES.CURRENT_USER, user);
    State.dispatch(STATES.RIGHT_MODE, RIGHTMODE.USER_PROFILE);
    OnMobile.showRightPanel();
  };

  // выбор чата - загрузка пользователей и сообщений
  setCurrentChat = (chat: IChat): void => {
    State.dispatch(STATES.CURRENT_CHAT, "loading");
    Promise.all([Api.getChatMessages(chat.id), Api.getChatUsers(chat.id)]).then(
      (result) => {
        // именно в таком порядке!!!
        State.dispatch(STATES.CHAT_USERS, this._prepareUsersList(result[1]));
        State.dispatch(
          STATES.CHAT_MESSAGES,
          this._prepareChatMessages(result[0], State.extract(STATES.CHAT_USERS))
        );
        State.dispatch(STATES.CURRENT_CHAT, chat);
        State.dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT);
        OnMobile.showRightPanel();
      }
    );
  };

  _prepareUsersList = (
    users: Awaited<IChatMessage[] | IChatUsers[]>
  ): object => {
    const res = {};
    users.forEach((user) => (res[user["id"]] = user));
    return res;
  };

  _prepareChatMessages = (messages, preparedUsers): IUser[] => {
    return messages.map((mess) => {
      mess["display_name"] = preparedUsers[mess["user_id"]].display_name;
      mess["avatar"] = preparedUsers[mess["user_id"]].avatar;
      return mess;
    });
  };
}

export default new ChatApp();
