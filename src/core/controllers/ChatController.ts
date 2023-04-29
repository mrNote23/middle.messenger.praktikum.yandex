import { IChat, IUser } from "../config/interfaces";
import State from "../State";
import ChatApi from "../API/ChatApi";
import { RES_URL } from "../API/endpoints";
import { OnMobile } from "../../utils/on-mobile";
import { ADMIN, RIGHTMODE, STATES, TOKEN } from "../config/types";

export class ChatController {
  static addChat(title: string) {
    ChatApi.add(title)
      .then((res) => {
        const tmp = {
          id: res.id,
          title,
          avatar: "/images/no-avatar.jpg",
          created_by: State.extract(ADMIN).id,
          unread_count: 0,
          last_message: null,
        };
        State.dispatch(STATES.CHATS_LIST, [
          ...State.extract(STATES.CHATS_LIST),
          tmp,
        ]);
        this.setCurrentChat(<IChat>tmp);
      })
      .catch(() => false);
  }

  static deleteChat(chatId: number) {
    ChatApi.delete(chatId)
      .then(() => {
        const tmp = State.extract(STATES.CHATS_LIST).filter(
          (elm) => elm.id !== chatId
        );
        State.dispatch(STATES.CHATS_LIST, tmp);
        if (tmp.length) {
          this.setCurrentChat(tmp[0]);
          // State.dispatch(STATES.CURRENT_CHAT, tmp[0]);
        } else {
          // this.setCurrentChat(null);
          State.dispatch(STATES.CURRENT_CHAT, null);
          State.dispatch(STATES.CHAT_MESSAGES, []);
          State.dispatch(STATES.CHAT_USERS, []);
        }
        State.dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT);
      })
      .catch(() => false);
  }

  static changeChatAvatar(chatId: number, avatar: File) {
    ChatApi.avatar(chatId, avatar)
      .then((res) => {
        let tmp = {
          ...State.extract(STATES.CURRENT_CHAT),
          avatar: `${RES_URL}/${res.avatar}`,
        };
        State.dispatch(STATES.CURRENT_CHAT, tmp);
        tmp = [...State.extract(STATES.CHATS_LIST)].map((elm) => {
          if (elm.id === chatId) {
            return { ...elm, avatar: `${RES_URL}/${res.avatar}` };
          } else {
            return elm;
          }
        });
        State.dispatch(STATES.CHATS_LIST, tmp);
      })
      .catch(() => false);
  }

  static loadChatsList = (): void => {
    ChatApi.list()
      .then((list: IChat[]) => {
        State.dispatch(
          STATES.CHATS_LIST,
          list.map((elm) => {
            return {
              ...elm,
              avatar: elm.avatar
                ? `${RES_URL}/${elm.avatar}`
                : `/images/no-avatar.jpg`,
            };
          })
        );
      })
      .catch(() => false);
  };

  static setCurrentChat = (chat: IChat): void => {
    if (
      !State.extract(STATES.CURRENT_CHAT) ||
      chat.id !== State.extract(STATES.CURRENT_CHAT).id
    ) {
      State.dispatch(STATES.CHAT_MESSAGES, "loading");
      ChatApi.users(chat.id).then((res: IUser[]) => {
        State.dispatch(
          STATES.CHAT_USERS,
          this._prepareUsersList(
            res.map((elm) => {
              return {
                ...elm,
                avatar: elm.avatar
                  ? `${RES_URL}/${elm.avatar}`
                  : `/images/no-avatar.jpg`,
              };
            })
          )
        );
        State.dispatch(STATES.CURRENT_CHAT, { ...chat, unread_count: 0 });
        State.dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT);
        ChatApi.token(chat.id)
          .then((res) => {
            State.dispatch(TOKEN, res.token);
          })
          .catch(() => false);

        // this._getToken(chat.id);
      });
    }
    OnMobile.showRightPanel();
  };

  private static _prepareUsersList(users: Awaited<IUser[]>): object {
    const res = {};
    users.forEach(
      (user) =>
        (res[user["id"]] = {
          ...user,
          display_name: user.display_name ? user.display_name : user.first_name,
        })
    );
    return res;
  }
}
