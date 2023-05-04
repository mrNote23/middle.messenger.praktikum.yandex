import { RES_URL } from "../core/API/endpoints";

export const pathToAvatar = (obj: any): any => {
  return {
    ...obj,
    avatar: obj.avatar ? `${RES_URL}/${obj.avatar}` : `/images/no-avatar.jpg`,
  };
};
