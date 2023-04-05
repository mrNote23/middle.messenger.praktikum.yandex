import view from "./ChatPage.hbs";
import { RenderTo } from "../../core/RenderTo.js";
import { Store } from "../../core/State.js";
import "./ChatPage.scss";

export class ChatPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // admin info
    Store("admin", {
      id: 8,
      first_name: "Андрей",
      second_name: "Суворов",
      display_name: "Andrey.S",
      login: "andrey.s",
      email: "andrey.s@email.com",
      phone: "89223332218",
      avatar: "/images/avatars/avatar-8.jpg",
      role: "admin",
    });

    Store("currentChat"); // текущий чат
    Store("currentUser"); // текущий пользователь чата
    Store("chatUsers", []); // пользователи текущего чата
    Store("leftMode", "chats"); // режим левой панели ( chats/users )
    Store("rightMode", "chat"); // режим правой панели (chat/adminProfile/userProfile/chatProfile)
    RenderTo(this, view);
  }

  disconnectedCallback() {}
}
