import { HTTPTransport } from "./HTTPTransport";
import { AUTH_ENDPOINTS } from "../API/endpoints";

describe("HTTP TESTING", () => {
  const http = new HTTPTransport("/auth");
  it("sign in", (done) => {
    http
      .post(`${AUTH_ENDPOINTS.LOGIN}`, {
        login: "johndoe",
        password: "strongpassword",
      })
      .then(() => {
        done();
      })
      .catch(() => {
        done(new Error("Request failed"));
      });
  });
  it("sign out", (done) => {
    http
      .post(`${AUTH_ENDPOINTS.LOGIN}`)
      .then(() => {
        done();
      })
      .catch(() => {
        done(new Error("Request failed"));
      });
  });
});
