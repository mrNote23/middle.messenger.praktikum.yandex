import view from "./ChatProfile.hbs";
import { Dispatch, Extract, Subscribe } from "../../../../../core/State.ts";
import { Confirm } from "../../../../../ui/confirm/confirm";
import { Component } from "../../../../../core/Component";
import "./ChatProfile.scss";
import { IChat } from "../../../../../core/interfaces";

export class ChatProfile extends Component {
  chat: IChat;

  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.subscriber = Subscribe("currentChat", (val) => {
      this.chat = val;
      this.render({ ...this.chat }, [
        {
          selector: "#back",
          event: "click",
          cb: () => {
            Dispatch("rightMode", "chat");
          },
        },
        {
          selector: "#chat-rename",
          event: "click",
          cb: this.renameChat,
        },
        {
          selector: "#chat-clear",
          event: "click",
          cb: this.clearChat,
        },
        {
          selector: "#chat-delete",
          event: "click",
          cb: this.deleteChat,
        },
      ]);
    });
  }

  renameChat = (): void => {
    Confirm(
      { title: "Are you sure?", text: "Do you want to rename the chat?" },
      () => {
        Dispatch(
          "chatsList",
          Extract("chatsList").map((elm) => {
            if (elm.id === this.chat.id) {
              return { ...elm, title: "New Title" };
            } else {
              return elm;
            }
          })
        );
        Dispatch("currentChat", {
          ...Extract("currentChat"),
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
