import { IChat, IUser } from "../config/interfaces";
import State from "../State";
import ChatApi from "../API/ChatApi";
import { RES_URL } from "../API/endpoints";
import { OnMobile } from "../../utils/on-mobile";
import { ADMIN, RIGHTMODE, STATES, TOKEN, TRecord } from "../config/types";
import Router from "../Router";

export class ChatController {
  static addChat(title: string): void {
    ChatApi.add(title)
      .then((res: unknown) => {
        const tmp = {
          id: (res as IChat).id,
          title,
          avatar: "/images/no-avatar.jpg",
          created_by: (State.extract(ADMIN) as IUser).id,
          unread_count: 0,
          last_message: null,
        };
        State.dispatch(STATES.CHATS_LIST, [
          ...(State.extract(STATES.CHATS_LIST) as IChat[]),
          tmp,
        ]);
        Router.go(`/chat/${tmp.id}`);
      })
      .catch(() => false);
  }

  static deleteChat(chatId: number): void {
    ChatApi.delete(chatId)
      .then(() => {
        const tmp = (State.extract(STATES.CHATS_LIST) as IChat[]).filter(
          (elm) => elm.id !== chatId
        );
        State.dispatch(STATES.CHATS_LIST, tmp);
        if (tmp.length) {
          Router.go(`/chat/${tmp[0].id}`);
        } else {
          State.dispatch(STATES.CURRENT_CHAT, null);
          State.dispatch(STATES.CHAT_MESSAGES, []);
          State.dispatch(STATES.CHAT_USERS, []);
          State.dispatch(STATES.CHATS_LIST, []);
          Router.go("/messenger");
        }
        State.dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT);
      })
      .catch(() => false);
  }

  static changeChatAvatar(chatId: number, avatar: File): void {
    ChatApi.avatar(chatId, avatar)
      .then((res: unknown) => {
        const tmpChat = {
          ...(State.extract(STATES.CURRENT_CHAT) as IChat),
          avatar: `${RES_URL}/${(res as IChat).avatar}`,
        };
        State.dispatch(STATES.CURRENT_CHAT, tmpChat);
        const tmpChatsList = [
          ...(State.extract(STATES.CHATS_LIST) as IChat[]),
        ].map((elm) => {
          if (elm.id === chatId) {
            return { ...elm, avatar: `${RES_URL}/${(res as IChat).avatar}` };
          } else {
            return elm;
          }
        });
        State.dispatch(STATES.CHATS_LIST, tmpChatsList);
      })
      .catch(() => false);
  }

  static loadChatsList = (): void => {
    ChatApi.list()
      .then((list: unknown) => {
        State.dispatch(
          STATES.CHATS_LIST,
          (list as IChat[]).map((elm) => {
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

  static setCurrentChat = (
    chatId: number,
    rightMode: string = RIGHTMODE.CHAT,
    userNull = true
  ): void => {
    if (
      !State.extract(STATES.CURRENT_CHAT) ||
      +chatId !== (State.extract(STATES.CURRENT_CHAT) as IChat).id
    ) {
      const chat = (State.extract(STATES.CHATS_LIST) as IChat[]).filter(
        (elm) => elm.id === +chatId
      )[0];
      if (!chat) {
        Router.go("/404");
      }
      State.dispatch(STATES.CHAT_MESSAGES, "loading");
      ChatApi.users(chat.id).then((res: unknown) => {
        State.dispatch(
          STATES.CHAT_USERS,
          this._prepareUsersList(
            (res as IUser[]).map((elm) => {
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
        State.dispatch(STATES.RIGHT_MODE, rightMode);
        userNull && State.dispatch(STATES.CURRENT_USER, null);

        ChatApi.token(chat.id)
          .then((res: TRecord) => {
            State.dispatch(TOKEN, res.token);
          })
          .catch(() => false);
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
