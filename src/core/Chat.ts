import Api from "./Api";
import { Dispatch, Extract } from "./State";
import { IChat, IChatMessage, IChatUsers, IUser } from "./interfaces";
import { OnMobile } from "../utils/on-mobile";

class Chat {
  constructor() {}

  // загрузка списка чатов
  loadChatsList = (): void => {
    Api.getChats()
      .then((list) => {
        list.length && Dispatch("chatsList", list);
      })
      .catch();
  };

  // выбор текущего пользователя
  setCurrentUser = (user: IUser): void => {
    console.log(user);
    Dispatch("currentUser", user);
    Dispatch("rightMode", "userProfile");
    OnMobile.showRightPanel();
  };

  // выбор чата - загрузка пользователей и сообщений
  setCurrentChat = (chat: IChat): void => {
    Dispatch("currentChat", "loading");
    Promise.all([Api.getChatMessages(chat.id), Api.getChatUsers(chat.id)]).then(
      (result) => {
        // именно в таком порядке!!!
        Dispatch("chatUsers", this._prepareUsersList(result[1]));
        Dispatch(
          "chatMessages",
          this._prepareChatMessages(result[0], Extract("chatUsers"))
        );
        Dispatch("currentChat", chat);
        Dispatch("rightMode", "chat");
        OnMobile.showRightPanel();
      }
    );
  };

  _prepareUsersList = (users: Awaited<IChatMessage[] | IChatUsers[]>): {} => {
    const res = {};
    users.forEach((user) => (res[user["id"]] = user));
    return res;
  };

  _prepareChatMessages = (messages, preparedUsers): IUser[] => {
    return messages.map((mess) => {
      mess["display_name"] = preparedUsers[mess["user_id"]].display_name;
      mess["avatar"] = preparedUsers[mess["user_id"]].avatar;
      return mess;
    });
  };
}

export default new Chat();
