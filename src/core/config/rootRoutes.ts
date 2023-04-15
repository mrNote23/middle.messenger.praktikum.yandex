import { TRoute } from "../../shared/router-component/RouterComponent";

export const rootRoutes: TRoute[] = [
  {
    path: "/",
    content: `<chat-page class="wrapper"></chat-page>`,
  },
  {
    path: "/login",
    content: `<login-page class="wrapper"></login-page>`,
  },
  {
    path: "/register",
    content: `<register-page class="wrapper"></register-page>`,
  },
  {
    path: "/404",
    content: `<error-page class="wrapper">404</error-page>`,
  },
  {
    path: "/500",
    content: `<error-page class="wrapper">500</error-page>`,
  },
  {
    path: "*",
    redirect: `/404`,
  },
];
