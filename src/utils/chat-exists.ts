import State from "../core/State";
import { STATES } from "../core/config/types";

export const chatExists = (chatId: number): boolean => {
  if (!State.extract(STATES.CHATS_LIST)) {
    return false;
  }
  return !!State.extract(STATES.CHATS_LIST).filter((elm) => elm.id === chatId)
    .length;
};
