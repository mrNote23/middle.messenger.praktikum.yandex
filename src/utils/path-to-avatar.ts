import { RES_URL } from "../core/API/endpoints";

export const pathToAvatar = (obj: object): object => {
  return {
    ...obj,
    avatar: obj.avatar ? `${RES_URL}/${obj.avatar}` : `/images/no-avatar.jpg`,
  };
};
