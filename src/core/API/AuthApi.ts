import { HTTPTransport } from "../services/HTTPTransport";
import { AUTH_ENDPOINTS } from "./endpoints";
import { TLoginData, TRegisterData } from "../config/types";

class AuthApi {
  http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport("/auth");
  }

  login(data: TLoginData): Promise<any> {
    return this.http.post(AUTH_ENDPOINTS.LOGIN, data);
  }

  register(data: TRegisterData): Promise<any> {
    return this.http.post(AUTH_ENDPOINTS.REGISTER, data);
  }

  logout(): Promise<any> {
    return this.http.post(AUTH_ENDPOINTS.LOGOUT);
  }

  profile(): Promise<any> {
    return this.http.get(AUTH_ENDPOINTS.PROFILE);
  }
}

export default new AuthApi();
