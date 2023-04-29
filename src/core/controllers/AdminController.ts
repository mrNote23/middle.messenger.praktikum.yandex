import UserApi from "../API/UserApi";
import State from "../State";
import { RES_URL } from "../API/endpoints";
import { IUser } from "../config/interfaces";
import { ADMIN } from "../config/types";

export class AdminController {
  static changeAdminAvatar(avatar: File) {
    UserApi.avatar(avatar)
      .then((res) => {
        const tmp = {
          ...State.extract(ADMIN),
          avatar: `${RES_URL}/${res.avatar}`,
        };
        State.dispatch(ADMIN, tmp);
      })
      .catch(() => false);
  }

  static changeAdminProfile(
    data: IUser,
    cbError: (e: unknown) => void,
    cbOk: () => void
  ) {
    UserApi.profile(data)
      .then((res) => {
        State.dispatch(ADMIN, {
          ...res,
          role: "admin",
          avatar: res.avatar
            ? `${RES_URL}/${res.avatar}`
            : `/images/no-avatar.jpg`,
        });
        cbOk();
      })
      .catch((e) => {
        if (e instanceof Object) {
          cbError(e);
        } else {
          cbError({ reason: e });
        }
      });
  }

  static changeAdminPassword(
    oldPassword: string,
    newPassword: string,
    cbError: (e: unknown) => void,
    cbOk: () => void
  ) {
    UserApi.password(oldPassword, newPassword)
      .then(() => {
        cbOk();
      })
      .catch((e) => {
        if (e instanceof Object) {
          cbError(e);
        } else {
          cbError({ reason: e });
        }
      });
  }
}
