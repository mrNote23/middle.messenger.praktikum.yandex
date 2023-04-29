import UserApi from "../API/UserApi";
import { IUser } from "../config/interfaces";
import ChatApi from "../API/ChatApi";
import State from "../State";
import { OnMobile } from "../../utils/on-mobile";
import { RIGHTMODE, STATES } from "../config/types";

export class UserController {
  static searchUser(login: string) {
    return UserApi.search(login);
  }

  static addUser(user: IUser) {
    ChatApi.addUsers(State.extract(STATES.CURRENT_CHAT).id, [user.id]).then(
      () => {
        const tmp = JSON.parse(
          JSON.stringify(State.extract(STATES.CHAT_USERS))
        );
        tmp[user.id] = user;
        State.dispatch(STATES.CHAT_USERS, tmp);
      }
    );
  }

  static deleteUser(userId: number) {
    ChatApi.deleteUsers(State.extract(STATES.CURRENT_CHAT).id, [userId])
      .then(() => {
        const tmp = JSON.parse(
          JSON.stringify(State.extract(STATES.CHAT_USERS))
        );
        delete tmp[userId];
        State.dispatch(STATES.CHAT_USERS, tmp);
      })
      .catch(() => false);
  }

  static setCurrentUser = (user: IUser): void => {
    State.dispatch(STATES.CURRENT_USER, user);
    State.dispatch(STATES.RIGHT_MODE, RIGHTMODE.USER_PROFILE);
    OnMobile.showRightPanel();
  };
}
