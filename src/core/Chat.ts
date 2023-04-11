import Api from "./Api";
import { Dispatch, Extract, Store } from "./State";
import { IChat, IChatMessage, IChatUsers, IUser } from "./interfaces";
import { OnMobile } from "../utils/on-mobile";
import { ModalWindowComponent } from "../ui/modal-window/ModalWindow";
import { ChatsList } from "../pages/chat/left-panel/chats-list/ChatsList";
import { UsersList } from "../pages/chat/left-panel/users-list/UsersList";
import { ChatHeader } from "../pages/chat/right-panel/chat/chat-header/ChatHeader";
import { ChatBody } from "../pages/chat/right-panel/chat/chat-body/ChatBody";
import { ChatFooter } from "../pages/chat/right-panel/chat/chat-footer/ChatFooter";
import { AdminProfile } from "../pages/chat/right-panel/admin-profile/AdminProfile";
import { UserProfile } from "../pages/chat/right-panel/user-profile/UserProfile";
import { ChatProfile } from "../pages/chat/right-panel/chat-profile/ChatProfile";
import { MainRouter } from "../ui/main-router/MainRouter";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { ErrorPage } from "../pages/misc/ErrorPage";
import { ChatPage } from "../pages/chat/ChatPage";
import { LeftPanel } from "../pages/chat/left-panel/LeftPanel";
import { RightPanel } from "../pages/chat/right-panel/RightPanel";

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

class Chat {
  constructor() {
    window.customElements.define("modal-window", ModalWindowComponent);

    window.customElements.define("chats-list", ChatsList);
    window.customElements.define("users-list", UsersList);
    window.customElements.define("chat-current", ChatHeader);
    window.customElements.define("chat-body", ChatBody);
    window.customElements.define("chat-sending", ChatFooter);

    window.customElements.define("admin-profile", AdminProfile);
    window.customElements.define("user-profile", UserProfile);
    window.customElements.define("chat-profile", ChatProfile);

    window.customElements.define("main-router", MainRouter);
    window.customElements.define("login-page", LoginPage);
    window.customElements.define("register-page", RegisterPage);
    window.customElements.define("error-page", ErrorPage);

    window.customElements.define("chat-page", ChatPage);
    window.customElements.define("left-panel", LeftPanel);
    window.customElements.define("right-panel", RightPanel);
  }

  start = () => {
    // admin info ВРЕМЕННО!
    Store(ADMIN, {
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

    Store(STATES.CHATS_LIST, []); // Список чатов (IChat[])
    Store(STATES.CURRENT_CHAT, null); // текущий чат (IChat)
    Store(STATES.CURRENT_USER, null); // текущий пользователь чата (IUser)
    Store(STATES.CHAT_USERS, []); // пользователи текущего чата (IUser[])
    Store(STATES.CHAT_MESSAGES, null); // сообщения текущего чата

    Store(STATES.LEFT_MODE, LEFTMODE.CHATS); // режим левой панели ( chats/users )
    Store(STATES.RIGHT_MODE, RIGHTMODE.CHAT); // режим правой панели (chat/adminProfile/userProfile/chatProfile)

    window.document.getElementById("root").innerHTML =
      "<main-router></main-router>";
  };

  // загрузка списка чатов
  loadChatsList = (): void => {
    Api.getChats()
      .then((list) => {
        list.length && Dispatch(STATES.CHATS_LIST, list);
      })
      .catch();
  };

  // выбор текущего пользователя
  setCurrentUser = (user: IUser): void => {
    console.log(user);
    Dispatch(STATES.CURRENT_USER, user);
    Dispatch(STATES.RIGHT_MODE, RIGHTMODE.USER_PROFILE);
    OnMobile.showRightPanel();
  };

  // выбор чата - загрузка пользователей и сообщений
  setCurrentChat = (chat: IChat): void => {
    Dispatch(STATES.CURRENT_CHAT, "loading");
    Promise.all([Api.getChatMessages(chat.id), Api.getChatUsers(chat.id)]).then(
      (result) => {
        // именно в таком порядке!!!
        Dispatch(STATES.CHAT_USERS, this._prepareUsersList(result[1]));
        Dispatch(
          STATES.CHAT_MESSAGES,
          this._prepareChatMessages(result[0], Extract(STATES.CHAT_USERS))
        );
        Dispatch(STATES.CURRENT_CHAT, chat);
        Dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT);
        OnMobile.showRightPanel();
      }
    );
  };

  _prepareUsersList = (users: Awaited<IChatMessage[] | IChatUsers[]>): {} => {
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

export default new Chat();
