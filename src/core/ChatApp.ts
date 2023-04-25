import State from "./State";
import { IChat, IUser } from "./config/interfaces";
import { OnMobile } from "../utils/on-mobile";
import { ModalWindowComponent } from "../shared/modal-window/ModalWindow";
import { FormValidator } from "../shared/form-validator/FormValidator";
import AuthApi from "./AuthApi";
import ChatApi from "./ChatApi";
import UserApi from "./UserApi";
import { RES_URL } from "./config/endpoints";
import WS from "./WS";
import ResourceApi from "./ResourceApi";

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
export const TOKEN = "token";
export const NEW_MESSAGE = "new_message";
export const LAST_MESSAGE_TIME = "las_message_time";

class ChatApp {
  rootRoutes;
  tmpMessages = [];

  constructor() {
    customElements.define("form-validator", FormValidator);
    customElements.define("modal-window", ModalWindowComponent);
  }

  // запуск приложения
  start = () => {
    window.addEventListener("popstate", <T>(e: T) => {
      this.navigate(e.currentTarget.location.pathname, false);
    });

    const url = window.location.pathname;

    if (["/", "/login", "/register"].includes(url)) {
      AuthApi.profile()
        .then((res) => {
          State.store(ADMIN, { ...this._setAdminAvatar(res), role: "admin" });
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

  // инициализация стэйта
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
      await AuthApi.login(props);
      const userData = await AuthApi.profile();
      const res = this._setAdminAvatar(userData);
      localStorage.setItem("admin", JSON.stringify(res));
      this.init();
      State.store(ADMIN, { ...res, role: "admin" });
      this.navigate("/");
    } catch (e) {
      if (e instanceof Object) {
        cbError(e);
      } else {
        cbError({ reason: e });
      }
    }
  }

  // регистрация пользователя
  async register<T>(props: T, cbError: (e: object) => void) {
    try {
      await AuthApi.register(props);

      const userData = await AuthApi.profile();
      const res = this._setAdminAvatar(userData);
      localStorage.setItem("admin", JSON.stringify(res));
      this.init();
      State.store(ADMIN, { ...res, role: "admin" });
      this.navigate("/");
    } catch (e) {
      if (e instanceof Object) {
        cbError(e);
      } else {
        cbError({ reason: e });
      }
    }
  }

  // logout
  async logout() {
    localStorage.removeItem("admin");
    await AuthApi.logout().catch(() => false);
    this.navigate("/login");
    State.clear();
  }

  // добавление нового чата
  addChat(title: string) {
    ChatApi.add(title)
      .then((res) => {
        const tmp = {
          id: res.id,
          title,
          avatar: "/images/no-avatar.jpg",
          created_by: State.extract(ADMIN).id,
          unread_count: 0,
          last_message: null,
        };
        State.dispatch(STATES.CHATS_LIST, [
          ...State.extract(STATES.CHATS_LIST),
          tmp,
        ]);
      })
      .catch(() => false);
  }

  // удаление чата
  deleteChat(chatId: number) {
    ChatApi.delete(chatId)
      .then(() => {
        const tmp = State.extract(STATES.CHATS_LIST).filter(
          (elm) => elm.id !== chatId
        );
        State.dispatch(STATES.CHATS_LIST, tmp);
        if (tmp.length) {
          State.dispatch(STATES.CURRENT_CHAT, tmp[0]);
        } else {
          State.dispatch(STATES.CURRENT_CHAT, null);
        }
        State.dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT);
      })
      .catch(() => false);
  }

  // установка аватара для чата
  changeChatAvatar(chatId: number, avatar: File) {
    ChatApi.avatar(chatId, avatar)
      .then((res) => {
        let tmp = {
          ...State.extract(STATES.CURRENT_CHAT),
          avatar: `${RES_URL}${res.avatar}`,
        };
        State.dispatch(STATES.CURRENT_CHAT, tmp);
        tmp = [...State.extract(STATES.CHATS_LIST)].map((elm) => {
          if (elm.id === chatId) {
            return { ...elm, avatar: `${RES_URL}${res.avatar}` };
          } else {
            return elm;
          }
        });
        State.dispatch(STATES.CHATS_LIST, tmp);
      })
      .catch(() => false);
  }

  // установка аватара админа
  changeAdminAvatar(avatar: File) {
    UserApi.avatar(avatar)
      .then((res) => {
        const tmp = {
          ...State.extract(ADMIN),
          avatar: `${RES_URL}${res.avatar}`,
        };
        State.dispatch(ADMIN, tmp);
      })
      .catch(() => false);
  }

  // редактирование профиля
  changeAdminProfile(
    data: IUser,
    cbError: (e: unknown) => void,
    cbOk: () => void
  ) {
    UserApi.profile(data)
      .then((res) => {
        State.dispatch(ADMIN, {
          ...res,
          role: "admin",
          avatar: res.avatar
            ? `${RES_URL}${res.avatar}`
            : `/images/no-avatar.jpg`,
        });
        cbOk();
      })
      .catch((e) => {
        if (e instanceof Object) {
          cbError(e);
        } else {
          cbError({ reason: e });
        }
      });
  }

  // изменение пароля
  changeAdminPassword(
    oldPassword: string,
    newPassword: string,
    cbError: (e: unknown) => void,
    cbOk: () => void
  ) {
    UserApi.password(oldPassword, newPassword)
      .then(() => {
        cbOk();
      })
      .catch((e) => {
        if (e instanceof Object) {
          cbError(e);
        } else {
          cbError({ reason: e });
        }
      });
  }

  // поиск пользователя
  searchUser = (login: string) => {
    return UserApi.search(login);
  };

  // добавление пользователя в чат
  addUser = (user: IUser) => {
    ChatApi.addUsers(State.extract(STATES.CURRENT_CHAT).id, [user.id]).then(
      () => {
        const tmp = JSON.parse(
          JSON.stringify(State.extract(STATES.CHAT_USERS))
        );

        tmp[user.id] = user;
        State.dispatch(STATES.CHAT_USERS, tmp);
      }
    );
  };

  // удаление пользователя из чата
  deleteUser = (userId: number) => {
    ChatApi.deleteUsers(State.extract(STATES.CURRENT_CHAT).id, [userId])
      .then(() => {
        const tmp = JSON.parse(
          JSON.stringify(State.extract(STATES.CHAT_USERS))
        );
        delete tmp[userId];
        State.dispatch(STATES.CHAT_USERS, tmp);
      })
      .catch(() => false);
  };

  // загрузка списка чатов
  loadChatsList = (): void => {
    ChatApi.list()
      .then((list: IChat[]) => {
        State.dispatch(
          STATES.CHATS_LIST,
          list.map((elm) => {
            return {
              ...elm,
              avatar: elm.avatar
                ? `${RES_URL}${elm.avatar}`
                : `/images/no-avatar.jpg`,
            };
          })
        );
      })
      .catch(() => false);
  };

  // выбор текущего пользователя
  setCurrentUser = (user: IUser): void => {
    State.dispatch(STATES.CURRENT_USER, user);
    State.dispatch(STATES.RIGHT_MODE, RIGHTMODE.USER_PROFILE);
    OnMobile.showRightPanel();
  };

  // выбор чата - загрузка пользователей и сообщений
  setCurrentChat = (chat: IChat): void => {
    if (
      !State.extract(STATES.CURRENT_CHAT) ||
      chat.id !== State.extract(STATES.CURRENT_CHAT).id
    ) {
      State.dispatch(STATES.CHAT_MESSAGES, "loading");
      ChatApi.users(chat.id).then((res: IUser[]) => {
        State.dispatch(
          STATES.CHAT_USERS,
          this._prepareUsersList(
            res.map((elm) => {
              return {
                ...elm,
                avatar: elm.avatar
                  ? `${RES_URL}${elm.avatar}`
                  : `/images/no-avatar.jpg`,
              };
            })
          )
        );
        State.dispatch(STATES.CURRENT_CHAT, { ...chat, unread_count: 0 });
        State.dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT);
        this._getToken(chat.id);
      });
    }
    OnMobile.showRightPanel();
  };

  // начальная загрузка сообщений
  loadOldMessages(messages) {
    if (messages.length) {
      this.tmpMessages = this._prepareChatMessages(
        [...messages.reverse(), ...this.tmpMessages],
        State.extract(STATES.CHAT_USERS)
      );
      WS.send({
        content: this.tmpMessages.length.toString(),
        type: "get old",
      });
    } else {
      State.dispatch(STATES.CHAT_MESSAGES, [...this.tmpMessages]);
      this.tmpMessages.length = 0;
    }
  }

  // отправка сообщений
  async sendMessage(message: string, attach: File | null = null) {
    if (attach) {
      const uploaded = await this._uploadResource(attach);
      if (uploaded) {
        WS.send({ type: "file", content: `${uploaded.id}` });
      }
    }
    if (message.length) {
      WS.send({ type: "message", content: message });
    }
  }

  // получено новое сообщение
  newMessage(message) {
    const user = State.extract(STATES.CHAT_USERS)[message.user_id];
    const mess = {
      ...message,
      avatar: State.extract(STATES.CHAT_USERS)[message.user_id].avatar,
      display_name: user.display_name,
    };
    State.dispatch(NEW_MESSAGE, mess);
  }

  // загрузка файла
  async _uploadResource(file: File) {
    let res;
    try {
      res = await ResourceApi.upload(file);
    } catch (e) {
      console.log(e);
      res = false;
    }
    return res;
  }

  _getToken = (chatId: number) => {
    ChatApi.token(chatId)
      .then((res) => {
        State.dispatch(TOKEN, res.token);
      })
      .catch(() => false);
  };

  _setAdminAvatar = (res) => {
    return {
      ...res,
      avatar: res.avatar ? `${RES_URL}${res.avatar}` : `/images/no-avatar.jpg`,
    };
  };

  _prepareUsersList = (users: Awaited<IUser[]>): object => {
    const res = {};
    users.forEach(
      (user) =>
        (res[user["id"]] = {
          ...user,
          display_name: user.display_name ? user.display_name : user.first_name,
        })
    );
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
