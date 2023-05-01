import State from "../State";
import WS from "../services/WS";
import ResourceApi from "../API/ResourceApi";
import { NEW_MESSAGE, STATES } from "../config/types";

type TMessage = {
  [key: string]: string | object;
};

export class MessagesController {
  private static _tmpMessages = [];

  static newMessage(message: TMessage): void {
    const user = State.extract(STATES.CHAT_USERS)[message.user_id];
    const mess = {
      ...message,
      avatar: State.extract(STATES.CHAT_USERS)[message.user_id].avatar,
      display_name: user.display_name,
    };
    State.dispatch(NEW_MESSAGE, mess);
  }

  static async sendMessage(message: string, attach: File | null = null) {
    if (attach) {
      const uploaded = await this._uploadResource(attach);
      if (uploaded) {
        WS.send({ type: "file", content: `${uploaded.id}` });
      }
    }
    if (message.length) {
      WS.send({ type: "message", content: message });
    }
  }

  static loadOldMessages(messages: TMessage[]): void {
    if (messages.length) {
      this._tmpMessages = this._prepareChatMessages(
        [...messages.reverse(), ...this._tmpMessages],
        State.extract(STATES.CHAT_USERS)
      );
      WS.send({
        content: this._tmpMessages.length.toString(),
        type: "get old",
      });
    } else {
      State.dispatch(STATES.CHAT_MESSAGES, [...this._tmpMessages]);
      this._tmpMessages.length = 0;
    }
  }

  private static _prepareChatMessages(
    messages: TMessage[],
    preparedUsers
  ): TMessage[] {
    return messages.map((mess: TMessage) => {
      mess["display_name"] = preparedUsers[mess["user_id"]].display_name;
      mess["avatar"] = preparedUsers[mess["user_id"]].avatar;
      return mess;
    });
  }

  private static async _uploadResource(file: File) {
    let res;
    try {
      res = await ResourceApi.upload(file);
    } catch (e) {
      console.log(e);
      res = false;
    }
    return res;
  }
}
