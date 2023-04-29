import AuthApi from "../API/AuthApi";
import State from "../State";
import ChatApp from "../ChatApp";
import { pathToAvatar } from "../../utils/path-to-avatar";
import { ADMIN } from "../config/types";

export class AuthController {
  static async login<T>(props: T, cbError: (e: object) => void) {
    try {
      await AuthApi.login(props);
      const userData = pathToAvatar(await AuthApi.profile());
      localStorage.setItem("admin", JSON.stringify(userData));
      ChatApp.init();
      State.store(ADMIN, { ...userData, role: "admin" });
      ChatApp.navigate("/");
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
      const userData = pathToAvatar(await AuthApi.profile());
      localStorage.setItem("admin", JSON.stringify(userData));
      ChatApp.init();
      State.store(ADMIN, { ...userData, role: "admin" });
      ChatApp.navigate("/");
    } catch (e) {
      if (e instanceof Object) {
        cbError(e);
      } else {
        cbError({ reason: e });
      }
    }
  }

  static async logout() {
    localStorage.removeItem("admin");
    await AuthApi.logout().catch(() => false);
    ChatApp.navigate("/login");
    State.clear();
  }
}
