export const API_URL = "https://ya-praktikum.tech/api/v2";
export const RES_URL = "https://ya-praktikum.tech/api/v2/resources";
export const API_WS_URL = "wss://ya-praktikum.tech/ws/chats";

export const MAX_UFS = 1024 * 1024;
export const MAX_UFSS = "1Mb";

export enum AUTH_ENDPOINTS {
  LOGIN = "/signin",
  REGISTER = "/signup",
  LOGOUT = "/logout",
  PROFILE = "/user",
}

export enum CHAT_ENDPOINTS {
  CHAT = "",
  USERS = "/users",
  TOKEN = "/token",
  AVATAR = "/avatar",
}

export enum USER_ENDPOINTS {
  PROFILE = "/profile",
  AVATAR = "/profile/avatar",
  PASSWORD = "/password",
  USER = "",
  SEARCH = "/search",
}

export enum RESOURCE_ENDPOINTS {
  UPLOAD = "",
}
