import State from "../core/State";
import { STATES } from "../core/config/types";

export const userExists = (userId: number): boolean => {
  if (!State.extract(STATES.CHAT_USERS)) {
    return false;
  }
  return !!State.extract(STATES.CHAT_USERS)[userId];
};
