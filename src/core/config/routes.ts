import State from "../State";
import { LEFTMODE, RIGHTMODE, STATES } from "./types";
import { OnMobile } from "../../utils/on-mobile";
import { ChatController } from "../controllers/ChatController";
import { UserController } from "../controllers/UserController";
import { chatExists } from "../../utils/chat-exists";
import { userExists } from "../../utils/user-exists";
import Router, { TRoutes } from "../Router";

export const routes: TRoutes = {
  root: {
    path: "/",
    redirect: "/messenger",
  },

  chatsList: {
    path: "/messenger",
    content: "<chat-page></chat-page>",
    cb: () => {
      State.dispatch(STATES.CURRENT_CHAT, null);
      State.dispatch(STATES.LEFT_MODE, LEFTMODE.CHATS);
      State.dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT);
      OnMobile.showLeftPanel();
    },
  },

  chat: {
    path: "/chat/:chatId",
    content: "<chat-page></chat-page>",
    cb: function () {
      if (!State.extract(STATES.CHATS_LIST)) {
        State.onceSubscribe(STATES.CHATS_LIST, () => {
          ChatController.setCurrentChat(this.params.chatId);
        });
      } else {
        if (!chatExists(+this.params.chatId)) {
          Router.go("/404");
          return;
        }
        ChatController.setCurrentChat(this.params.chatId);
      }
      State.dispatch(STATES.LEFT_MODE, LEFTMODE.CHATS);
      State.dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT);
    },
  },

  chatProfile: {
    path: "/chat-profile/:chatId",
    content: "<chat-page></chat-page>",
    cb: function () {
      if (!State.extract(STATES.CHATS_LIST)) {
        State.onceSubscribe(STATES.CHATS_LIST, () => {
          ChatController.setCurrentChat(
            this.params.chatId,
            RIGHTMODE.CHAT_PROFILE
          );
        });
      } else {
        if (!chatExists(+this.params.chatId)) {
          Router.go("/404");
          return;
        }
        State.dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT_PROFILE);
      }
    },
  },

  usersList: {
    path: "/users/:chatId",
    content: "<chat-page></chat-page>",
    cb: function () {
      if (!State.extract(STATES.CHATS_LIST)) {
        State.onceSubscribe(STATES.CHATS_LIST, () => {
          ChatController.setCurrentChat(this.params.chatId);
        });
        State.onceSubscribe(STATES.CURRENT_CHAT, () => {
          State.dispatch(STATES.LEFT_MODE, LEFTMODE.USERS);
        });
      } else {
        if (!chatExists(+this.params.chatId)) {
          Router.go("/404");
          return;
        }
        State.dispatch(STATES.LEFT_MODE, LEFTMODE.USERS);
        State.dispatch(STATES.CURRENT_USER, null);
        State.dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT);
      }
    },
  },

  userProfile: {
    path: "/user/:chatId/:userId",
    content: "<chat-page></chat-page>",
    cb: function () {
      if (!State.extract(STATES.CHATS_LIST)) {
        State.onceSubscribe(STATES.CHATS_LIST, () => {
          ChatController.setCurrentChat(
            this.params.chatId,
            RIGHTMODE.USER_PROFILE,
            false
          );
        });
        State.onceSubscribe(STATES.CURRENT_CHAT, () => {
          State.dispatch(STATES.LEFT_MODE, LEFTMODE.USERS);
          State.dispatch(STATES.RIGHT_MODE, RIGHTMODE.USER_PROFILE);
          UserController.setCurrentUser(this.params.userId);
        });
      } else {
        if (
          !chatExists(+this.params.chatId) ||
          !userExists(+this.params.userId)
        ) {
          Router.go("/404");
          return;
        }
        State.dispatch(STATES.LEFT_MODE, LEFTMODE.USERS);
        UserController.setCurrentUser(this.params.userId);
      }
    },
  },

  login: {
    path: "/sign-in",
    content: "<login-page></login-page>",
  },

  register: {
    path: "/sign-up",
    content: "<register-page></register-page>",
  },

  profile: {
    path: "/settings",
    content: "<chat-page></chat-page>",
    cb: () => {
      State.dispatch(STATES.RIGHT_MODE, RIGHTMODE.ADMIN_PROFILE);
      OnMobile.showRightPanel();
    },
  },

  route404: {
    path: "/404",
    content: "<error-page>404</error-page>",
  },

  route500: {
    path: "/500",
    content: "<error-page>500</error-page>",
  },

  undefined: {
    path: "/*",
    redirect: "/404",
  },
};
