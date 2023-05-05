import { RES_URL } from "../core/API/endpoints";
import { IChat, IChatMessageItem, IUser } from "../core/config/interfaces";

export const pathToAvatar = (obj: IUser | IChat | IChatMessageItem) => {
  return {
    ...obj,
    avatar: obj.avatar ? `${RES_URL}/${obj.avatar}` : `/images/no-avatar.jpg`,
  };
};
