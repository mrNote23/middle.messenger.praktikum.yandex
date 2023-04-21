import { HTTPTransport } from "./HTTPTransport";
import { CHAT_ENDPOINTS } from "./config/endpoints";
import { IChat, IUser } from "./config/interfaces";

class ChatApi {
  http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport("/chats");
  }

  add(title: string) {
    return this.http.post(CHAT_ENDPOINTS.CHAT, { title });
  }

  delete(chatId: number) {
    return this.http.delete(CHAT_ENDPOINTS.CHAT, { chatId });
  }

  list(): Promise<IChat[]> {
    return this.http.get(CHAT_ENDPOINTS.CHAT);
  }

  users(chatId: number): Promise<IUser[]> {
    return this.http.get(`${CHAT_ENDPOINTS.CHAT}/${chatId}/users`);
  }

  addUsers(chatId: number, users: number[]) {
    return this.http.put(CHAT_ENDPOINTS.USERS, { users, chatId });
  }

  deleteUsers(chatId: number, users: number[]) {
    return this.http.delete(CHAT_ENDPOINTS.USERS, { users, chatId });
  }

  async token(chatId: number): Promise<string> {
    const res = await this.http.post(`${CHAT_ENDPOINTS.TOKEN}/${chatId}`);
    return res.token;
  }
}

export default new ChatApi();
