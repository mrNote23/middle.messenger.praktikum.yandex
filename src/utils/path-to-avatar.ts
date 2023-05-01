import { RES_URL } from "../core/API/endpoints";

export const pathToAvatar = <T>(obj: T): T => {
  return {
    ...obj,
    avatar: obj.avatar ? `${RES_URL}/${obj.avatar}` : `/images/no-avatar.jpg`,
  };
};
