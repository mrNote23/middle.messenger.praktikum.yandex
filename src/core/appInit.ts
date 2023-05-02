import State from "./State";
import {
  ADMIN,
  LAST_MESSAGE_TIME,
  LEFTMODE,
  NEW_MESSAGE,
  RIGHTMODE,
  STATES,
  TOKEN,
} from "./config/types";
import WS from "./services/WS";

export const appInit = (): void => {
  State.store(ADMIN, null);
  State.store(TOKEN, null);
  State.store(NEW_MESSAGE, null);
  State.store(LAST_MESSAGE_TIME, null);
  State.store(STATES.CHATS_LIST, null); // Список чатов (IChat[])
  State.store(STATES.CURRENT_CHAT, null); // текущий чат (IChat)
  State.store(STATES.CURRENT_USER, null); // текущий пользователь чата (IUser)
  State.store(STATES.CHAT_USERS, null); // пользователи текущего чата (IUser[])
  State.store(STATES.CHAT_MESSAGES, []); // сообщения текущего чата

  State.store(STATES.LEFT_MODE, LEFTMODE.CHATS); // режим левой панели ( chats/users )
  State.store(STATES.RIGHT_MODE, RIGHTMODE.CHAT); // режим правой панели (chat/adminProfile/userProfile/chatProfile)
  WS.init();
};
