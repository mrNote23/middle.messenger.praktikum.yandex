export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
}

export interface IChatUsers {
  chat_id: number;
  users: IUser[];
}

export interface IChat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
}

export interface IChatMessageItem {
  id: number;
  user_id: number;
  display_name?: string;
  avatar?: string;
  chat_id: number;
  time: string;
  type: string;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_data: string;
  };
}

export interface IChatMessage {
  chat_id: number;
  messages: IChatMessageItem[];
}
