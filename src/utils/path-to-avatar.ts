import { RES_URL } from "../core/API/endpoints";

type T = {
  [key: string]: string;
};
export const pathToAvatar = (obj: T): T => {
  return {
    ...obj,
    avatar: obj.avatar ? `${RES_URL}/${obj.avatar}` : `/images/no-avatar.jpg`,
  };
};
