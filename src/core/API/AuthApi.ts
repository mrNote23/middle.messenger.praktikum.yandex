import { HTTPTransport } from "../services/HTTPTransport";
import { AUTH_ENDPOINTS } from "./endpoints";

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

  login(data: TLoginData): Promise<Response> {
    return this.http.post(AUTH_ENDPOINTS.LOGIN, data);
  }

  register(data: TRegisterData): Promise<Response> {
    return this.http.post(AUTH_ENDPOINTS.REGISTER, data);
  }

  logout(): Promise<Response> {
    return this.http.post(AUTH_ENDPOINTS.LOGOUT);
  }

  profile(): Promise<Response> {
    return this.http.get(AUTH_ENDPOINTS.PROFILE);
  }
}

export default new AuthApi();
