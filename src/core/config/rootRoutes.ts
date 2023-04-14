import { TRoute } from "../../router-component/RouterComponent";

export const rootRoutes: TRoute[] = [
  {
    path: "/",
    content: `<chat-page></chat-page>`,
  },
  {
    path: "/login",
    content: `<login-page></login-page>`,
  },
  {
    path: "/register",
    content: `<register-page></register-page>`,
  },
  {
    path: "/404",
    content: `<error-page>404</error-page>`,
  },
  {
    path: "/500",
    content: `<error-page>500</error-page>`,
  },
  {
    path: "*",
    redirect: `/404`,
  },
];
