import { HTTPTransport } from "../services/HTTPTransport";
import { USER_ENDPOINTS } from "./endpoints";
import { IUser } from "../config/interfaces";

class UserApi {
  http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport("/user");
  }

  search(login: string): Promise<any> {
    return this.http.post(USER_ENDPOINTS.SEARCH, { login });
  }

  avatar(avatar: File): Promise<any> {
    const tmp = new FormData();
    tmp.append("avatar", avatar);
    return this.http.put(USER_ENDPOINTS.AVATAR, tmp);
  }

  profile(data: IUser): Promise<any> {
    return this.http.put(USER_ENDPOINTS.PROFILE, data);
  }

  password(oldPassword: string, newPassword: string): Promise<any> {
    return this.http.put(USER_ENDPOINTS.PASSWORD, { oldPassword, newPassword });
  }
}

export default new UserApi();
