import { HTTPTransport } from "./HTTPTransport";
import { AUTH_ENDPOINTS, USER_ENDPOINTS } from "./config/endpoints";
import { IUser } from "./config/interfaces";

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

  // user login
  async login(data: TLoginData): Promise<unknown> {
    return this.http.post(AUTH_ENDPOINTS.LOGIN, data);
  }

  // user register
  async register(data: TRegisterData): Promise<unknown> {
    return this.http.post(AUTH_ENDPOINTS.REGISTER, data);
  }

  // user logout
  async logout(): Promise<void> {
    return this.http.post(AUTH_ENDPOINTS.LOGOUT);
  }

  // get user's profile
  async profile(): Promise<IUser> {
    return this.http.get(AUTH_ENDPOINTS.PROFILE);
  }
}

export default new AuthApi();
