import { HTTPTransport } from "./HTTPTransport";
import { USER_ENDPOINTS } from "./config/endpoints";

class UserApi {
  http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport("/user");
  }

  search(login: string) {
    return this.http.post(USER_ENDPOINTS.SEARCH, { login });
  }

  avatar(avatar: File) {
    const tmp = new FormData();
    tmp.append("avatar", avatar);
    return this.http.put(USER_ENDPOINTS.AVATAR, tmp);
  }
}

export default new UserApi();
