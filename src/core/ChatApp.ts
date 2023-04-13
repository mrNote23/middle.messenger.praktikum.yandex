import Api from "./Api";
import State from "./State";
import { IChat, IChatMessage, IChatUsers, IUser } from "./interfaces";
import { OnMobile } from "../utils/on-mobile";
import { ModalWindowComponent } from "../ui/modal-window/ModalWindow";
import { MainRouter } from "../main-router/MainRouter";

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
  CHATS = "chats",
  USERS = "users",
}

export enum RIGHTMODE {
  CHAT = "chat",
  ADMIN_PROFILE = "adminProfile",
  USER_PROFILE = "userProfile",
  CHAT_PROFILE = "chatProfile",
}

export const ADMIN = "admin";

class ChatApp {
  constructor() {
    window.customElements.define("main-router", MainRouter);
    window.customElements.define("modal-window", ModalWindowComponent);
  }

  start = () => {
    // инициализация состояний
    State.store(STATES.CHATS_LIST, []); // Список чатов (IChat[])
    State.store(STATES.CURRENT_CHAT, null); // текущий чат (IChat)
    State.store(STATES.CURRENT_USER, null); // текущий пользователь чата (IUser)
    State.store(STATES.CHAT_USERS, []); // пользователи текущего чата (IUser[])
    State.store(STATES.CHAT_MESSAGES, null); // сообщения текущего чата

    State.store(STATES.LEFT_MODE, LEFTMODE.CHATS); // режим левой панели ( chats/users )
    State.store(STATES.RIGHT_MODE, RIGHTMODE.CHAT); // режим правой панели (chat/adminProfile/userProfile/chatProfile)

    // TODO: Потом убрать
    State.store(ADMIN, {
      id: 8,
      first_name: "Андрей",
      second_name: "Суворов",
      display_name: "Andrey.S",
      login: "andrey.s",
      email: "andrey.s@email.com",
      phone: "89223332218",
      avatar: "/images/avatars/avatar-8.jpg",
      role: "admin",
    });

    window.document.getElementById(
      "root"
    ).innerHTML = `<main-router></main-router>`;
  };

  // навигация на url
  navigate = (path: string): void => {
    const router = document.getElementsByTagName("main-router");
    router[0] && router[0].setAttribute("path", path);
  };

  // логин пользователя
  login = <T>(props: T): void => {
    console.log(props);
    // admin info ВРЕМЕННО!
    State.store(ADMIN, {
      id: 8,
      first_name: "Андрей",
      second_name: "Суворов",
      display_name: "Andrey.S",
      login: "andrey.s",
      email: "andrey.s@email.com",
      phone: "89223332218",
      avatar: "/images/avatars/avatar-8.jpg",
      role: "admin",
    });

    this.navigate("/");
  };

  // logout
  logout = () => {
    State.clear();
    this.navigate("/");
  };
  // регистрация пользователя
  register = <T>(props: T): void => {
    console.log(props);
    // admin info ВРЕМЕННО!
    State.store(ADMIN, {
      id: 8,
      first_name: "Андрей",
      second_name: "Суворов",
      display_name: "Andrey.S",
      login: "andrey.s",
      email: "andrey.s@email.com",
      phone: "89223332218",
      avatar: "/images/avatars/avatar-8.jpg",
      role: "admin",
    });

    this.navigate("/");
  };

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