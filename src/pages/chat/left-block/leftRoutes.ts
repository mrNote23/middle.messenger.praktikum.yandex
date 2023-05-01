import { TSwitchRoute } from "../../../shared/content-switch/ContentSwitch";
import { LEFTMODE } from "../../../core/config/types";

export const leftRoutes: TSwitchRoute[] = [
  {
    path: LEFTMODE.CHATS,
    content: `<left-chats-list class="sidebar-body" id="chats-list"></left-chats-list>`,
  },
  {
    path: LEFTMODE.USERS,
    content: `<left-users-list class="sidebar-body" id="users-list"></left-users-list>`,
  },
];
