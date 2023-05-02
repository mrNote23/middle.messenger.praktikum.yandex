export const ADMIN = "admin";
export const TOKEN = "token";
export const NEW_MESSAGE = "new_message";
export const LAST_MESSAGE_TIME = "las_message_time";

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
