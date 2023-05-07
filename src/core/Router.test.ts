import { appInit } from "./appInit";
import Router from "./Router";
import { expect } from "chai";
import { routes } from "./config/routes";

describe("ROUTER TESTING", () => {
  appInit();
  const root = document.getElementById("root");
  Router.use(routes.root)
    .use(routes.chatsList)
    .use(routes.chat)
    .use(routes.chatProfile)
    .use(routes.usersList)
    .use(routes.userProfile)
    .use(routes.profile)
    .use(routes.login)
    .use(routes.register)
    .use(routes.route404)
    .use(routes.route500)
    .use(routes.undefined)
    .start(root);

  it("path: /", () => {
    Router.go("/");
    expect(Router.currentRoute.path).to.eq("/messenger");
  });
  it("path: /sign-in", () => {
    Router.go("/sign-in");
    expect(Router.currentRoute.path).to.eq("/sign-in");
  });
  it("path: /sign-up", () => {
    Router.go("/sign-up");
    expect(Router.currentRoute.path).to.eq("/sign-up");
  });
  it("path: /settings", () => {
    Router.go("/settings");
    expect(Router.currentRoute.path).to.eq("/settings");
  });
  it("path: /notfound", () => {
    Router.go("/notfound");
    expect(Router.currentRoute.path).to.eq("/404");
  });
});
