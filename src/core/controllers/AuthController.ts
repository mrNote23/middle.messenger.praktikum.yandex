import AuthApi from "../API/AuthApi";
import State from "../State";
import { pathToAvatar } from "../../utils/path-to-avatar";
import { ADMIN } from "../config/types";
import { IUser } from "../config/interfaces";
import Router from "../Router";
import { appInit } from "../appInit";

export class AuthController {
  static auth(): Promise<boolean> {
    return AuthApi.profile()
      .then((adminData: IUser) => {
        State.store(ADMIN, { ...pathToAvatar(adminData), role: "admin" });
        return true;
      })
      .catch(() => {
        Router.go("/login");
        return false;
      });
  }

  static async login<T>(props: T, cbError: (e: object) => void) {
    try {
      await AuthApi.login(props);
      appInit();
      this.auth().then((res) => {
        if (res) {
          Router.go("/");
        } else {
          cbError({ reason: "Something wrong..." });
        }
      });
    } catch (e) {
      if (e instanceof Object) {
        cbError(e);
      } else {
        cbError({ reason: e });
      }
    }
  }

  static async register<T>(props: T, cbError: (e: object) => void) {
    try {
      await AuthApi.register(props);
      appInit();
      this.auth().then((res) => {
        if (res) {
          Router.go("/");
        } else {
          cbError({ reason: "Something wrong..." });
        }
      });
    } catch (e) {
      if (e instanceof Object) {
        cbError(e);
      } else {
        cbError({ reason: e });
      }
    }
  }

  static async logout() {
    await AuthApi.logout().catch(() => false);
    Router.go("/login");
    State.clear();
  }
}
