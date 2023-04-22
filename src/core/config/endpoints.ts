export const API_URL = "https://ya-praktikum.tech/api/v2";
export const RES_URL = "https://ya-praktikum.tech/api/v2/resources/";

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
