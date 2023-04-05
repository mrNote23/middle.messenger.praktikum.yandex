import { _chats } from "../fakedb/_chats.js";
import { _chatUsers } from "../fakedb/_chatUsers.js";
import { _chatMessages } from "../fakedb/_chatMessages.js";

class Api {
  constructor() {
    this.delay = 200;
  }

  getChats = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(_chats);
      }, this.delay);
    });
  };

  getChatUsers = (chatId) => {
    const result = _chatUsers.filter((elm) => elm.chat_id === chatId);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(result[0].users);
      }, this.delay);
    });
  };

  getChatMessages = (chatId) => {
    const result = _chatMessages.filter((elm) => elm.chat_id === chatId);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(result[0].messages);
      }, this.delay);
    });
  };

  getChatInfo = (chat_id) => {};
}

export default new Api();
