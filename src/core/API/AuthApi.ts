import { HTTPTransport } from "../services/HTTPTransport";
import { AUTH_ENDPOINTS } from "./endpoints";
import { IUser } from "../config/interfaces";

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
  login(data: TLoginData): Promise<unknown> {
    return this.http.post(AUTH_ENDPOINTS.LOGIN, data);
  }

  // user register
  register(data: TRegisterData): Promise<unknown> {
    return this.http.post(AUTH_ENDPOINTS.REGISTER, data);
  }

  // user logout
  logout(): Promise<void> {
    return this.http.post(AUTH_ENDPOINTS.LOGOUT);
  }

  // get user's profile
  profile(): Promise<IUser> {
    return this.http.get(AUTH_ENDPOINTS.PROFILE);
  }
}

export default new AuthApi();
