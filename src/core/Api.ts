import { _chats } from "../fakedb/_chats";
import { _chatUsers } from "../fakedb/_chatUsers";
import { _chatMessages } from "../fakedb/_chatMessages";
import { IChat, IChatMessage, IChatUsers } from "./interfaces";

class Api {
  delay = 200;

  getChats = (): Promise<IChat[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(_chats);
      }, this.delay);
    });
  };

  getChatUsers = (chatId: number): Promise<IChatUsers[]> => {
    const result = _chatUsers.filter((elm) => elm.chat_id === chatId);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(result[0].users);
      }, this.delay);
    });
  };

  getChatMessages = (chatId: number): Promise<IChatMessage[]> => {
    const result = _chatMessages.filter((elm) => elm.chat_id === chatId);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(result[0].messages);
      }, this.delay);
    });
  };
}

export default new Api();
