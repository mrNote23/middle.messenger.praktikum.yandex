import { TRoute } from "../../../shared/router-component/RouterComponent";
import { LEFTMODE } from "../../../core/ChatApp";

export const leftRoutes: TRoute[] = [
  {
    path: LEFTMODE.CHATS,
    content:
      "<left-chats-list class='sidebar-body' id='chats-list'></left-chats-list>",
  },
  {
    path: LEFTMODE.USERS,
    content:
      "<left-users-list class='sidebar-body' id='users-list'></left-users-list>",
  },
];
