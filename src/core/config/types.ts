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

export type TRecord = { [key: string]: any };

export type TError = { reason: string };

export type TEventTarget = {
  target?: HTMLInputElement | HTMLButtonElement | HTMLElement | any;
  key?: string;
  code?: number;
};

export type TNode = HTMLElement & TRecord;

export type TLoginData = {
  login: string;
  password: string;
};

export type TRegisterData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};
