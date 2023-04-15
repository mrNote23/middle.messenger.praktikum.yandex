import { IChat } from "../core/config/interfaces";

export const _chats: IChat[] = [
  {
    id: 0,
    title: "Команда мечты",
    avatar: "/images/avatars/chat-avatar-1.jpg",
    unread_count: 0,
    last_message: {
      user: {
        first_name: "Petya",
        second_name: "Pupkin",
        avatar: "/path/to/avatar.jpg",
        email: "my@email.com",
        login: "userLogin",
        phone: "8(911)-222-33-22",
      },
      time: "2023-01-02T14:22:22.000Z",
      content:
        "this is message content content message this message is content",
    },
  },
  {
    id: 1,
    title: "Тайная комната",
    avatar: "/images/avatars/chat-avatar-2.jpg",
    unread_count: 15,
    last_message: {
      user: {
        first_name: "Petya",
        second_name: "Pupkin",
        avatar: "/path/to/avatar.jpg",
        email: "my@email.com",
        login: "userLogin",
        phone: "8(911)-222-33-22",
      },
      time: "2023-01-02T14:22:22.000Z",
      content: "this is message content",
    },
  },
  {
    id: 2,
    title: "Виртуальная реальность",
    avatar: "/images/avatars/chat-avatar-3.jpg",
    unread_count: 5,
    last_message: {
      user: {
        first_name: "Petya",
        second_name: "Pupkin",
        avatar: "/path/to/avatar.jpg",
        email: "my@email.com",
        login: "userLogin",
        phone: "8(911)-222-33-22",
      },
      time: "2023-01-02T14:22:22.000Z",
      content: "this is message content",
    },
  },
];
