import State from "../core/State";
import { STATES } from "../core/config/types";
import { IUser } from "../core/config/interfaces";

export const chatExists = (chatId: number): boolean => {
  if (!State.extract(STATES.CHATS_LIST)) {
    return false;
  }

  const tmp = <IUser[]>State.extract(STATES.CHATS_LIST);

  return !!tmp.filter((elm) => elm.id === chatId).length;
};
