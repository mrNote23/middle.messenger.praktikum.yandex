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
}

export default new UserApi();
