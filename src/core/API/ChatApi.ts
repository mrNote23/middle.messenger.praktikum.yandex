import { HTTPTransport } from "../services/HTTPTransport";
import { CHAT_ENDPOINTS } from "./endpoints";

class ChatApi {
  http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport("/chats");
  }

  add(title: string): Promise<Response> {
    return this.http.post(CHAT_ENDPOINTS.CHAT, { title });
  }

  delete(chatId: number): Promise<Response> {
    return this.http.delete(CHAT_ENDPOINTS.CHAT, { chatId });
  }

  list(): Promise<Response> {
    return this.http.get(CHAT_ENDPOINTS.CHAT);
  }

  users(chatId: number): Promise<Response> {
    return this.http.get(`${CHAT_ENDPOINTS.CHAT}/${chatId}/users`);
  }

  addUsers(chatId: number, users: number[]): Promise<Response> {
    return this.http.put(CHAT_ENDPOINTS.USERS, { users, chatId });
  }

  deleteUsers(chatId: number, users: number[]): Promise<Response> {
    return this.http.delete(CHAT_ENDPOINTS.USERS, { users, chatId });
  }

  avatar(chatId: number, avatar: File): Promise<Response> {
    const tmp = new FormData();
    tmp.append("chatId", chatId.toString());
    tmp.append("avatar", avatar);
    return this.http.put(CHAT_ENDPOINTS.AVATAR, tmp);
  }

  token(chatId: number): Promise<object> {
    return this.http.post(`${CHAT_ENDPOINTS.TOKEN}/${chatId}`);
  }
}

export default new ChatApi();
