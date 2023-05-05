import State from "../core/State";
import { STATES } from "../core/config/types";
import { IUser } from "../core/config/interfaces";

export const userExists = (userId: number) => {
  if (!State.extract(STATES.CHAT_USERS)) {
    return false;
  }
  const tmp = <IUser[]>State.extract(STATES.CHAT_USERS);
  return !!tmp[userId];
};
