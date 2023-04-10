import view from "./ChatPage.hbs";
import { Component } from "../../core/Component";
import { Store } from "../../core/State";
import "./ChatPage.scss";

export class ChatPage extends Component {
  constructor() {
    super(view);
  }

  connectedCallback(): void {
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

    Store("chatsList", []); // Список чатов (IChat[])
    Store("currentChat", null); // текущий чат (IChat)
    Store("currentUser", null); // текущий пользователь чата (IUser)
    Store("chatUsers", []); // пользователи текущего чата (IUser[])
    Store("chatMessages", null); // сообщения текущего чата

    Store("leftMode", "chats"); // режим левой панели ( chats/users )
    Store("rightMode", "chat"); // режим правой панели (chat/adminProfile/userProfile/chatProfile)
    this.render();
  }
}
