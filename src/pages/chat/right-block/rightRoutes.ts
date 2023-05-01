import { TRoute } from "../../../shared/content-switch/ContentSwitch";
import { RIGHTMODE } from "../../../core/config/types";

export const rightRoutes: TRoute[] = [
  {
    path: RIGHTMODE.CHAT,
    content:
      "<chat-header class='chat-header'></chat-header><chat-body class='chat-body'></chat-body><chat-footer class='chat-footer'></chat-footer>",
  },
  {
    path: RIGHTMODE.ADMIN_PROFILE,
    content: "<admin-profile class='profile'></admin-profile>",
  },
  {
    path: RIGHTMODE.USER_PROFILE,
    content: "<user-profile class='profile'></user-profile>",
  },
  {
    path: RIGHTMODE.CHAT_PROFILE,
    content: "<chat-profile class='profile'></chat-profile>",
  },
];
