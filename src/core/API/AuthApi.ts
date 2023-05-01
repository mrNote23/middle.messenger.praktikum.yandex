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

  login(data: TLoginData): Promise<HTTPTransport> {
    return this.http.post(AUTH_ENDPOINTS.LOGIN, data);
  }

  register(data: TRegisterData): Promise<HTTPTransport> {
    return this.http.post(AUTH_ENDPOINTS.REGISTER, data);
  }

  logout(): Promise<HTTPTransport> {
    return this.http.post(AUTH_ENDPOINTS.LOGOUT);
  }

  profile(): Promise<IUser> {
    return this.http.get(AUTH_ENDPOINTS.PROFILE);
  }
}

export default new AuthApi();
