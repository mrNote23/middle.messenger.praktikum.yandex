import { HTTPTransport } from "./HTTPTransport";
import { USER_ENDPOINTS } from "./config/endpoints";

type TLoginData = {
  login: string;
  password: string;
};

type TRegisterData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

class AuthApi {
  http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport("/auth");
  }

  async login(data: TLoginData) {
    return this.http.post(USER_ENDPOINTS.LOGIN, data);
  }

  async register(data: TRegisterData) {
    return this.http.post(USER_ENDPOINTS.REGISTER, data);
  }

  async logout() {
    return this.http.post(USER_ENDPOINTS.LOGOUT);
  }

  async profile() {
    return this.http.get(USER_ENDPOINTS.PROFILE);
  }
}

export default new AuthApi();
