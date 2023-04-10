import view from "./ChatProfile.hbs";
import { Dispatch, Extract, Subscribe } from "../../../../../core/State.ts";
import { Confirm } from "../../../../../ui/confirm/confirm";
import { Component } from "../../../../../core/Component";
import "./ChatProfile.scss";
import { IChat } from "../../../../../core/interfaces";
import { RIGHTMODE, STATES } from "../../../../../core/Chat";

export class ChatProfile extends Component {
  chat: IChat;

  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.subscriber = Subscribe(STATES.CURRENT_CHAT, (val) => {
      this.chat = val;
      this.render({ ...this.chat });
    });
  }

  backBtn = () => {
    Dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT);
  };

  renameChat = (): void => {
    Confirm(
      { title: "Are you sure?", text: "Do you want to rename the chat?" },
      () => {
        Dispatch(
          STATES.CHATS_LIST,
          Extract(STATES.CHATS_LIST).map((elm) => {
            if (elm.id === this.chat.id) {
              return { ...elm, title: "New Title" };
            } else {
              return elm;
            }
          })
        );
        Dispatch(STATES.CURRENT_CHAT, {
          ...Extract(STATES.CURRENT_CHAT),
          title: "New Title",
        });
      }
    );
  };

  clearChat = (): void => {
    Confirm(
      { title: "Are you sure?", text: "Do you want to clear the chat?" },
      () => {}
    );
  };

  deleteChat = (): void => {
    Confirm(
      { title: "Are you sure?", text: "Do you want to delete a chat?" },
      () => {}
    );
  };
}
