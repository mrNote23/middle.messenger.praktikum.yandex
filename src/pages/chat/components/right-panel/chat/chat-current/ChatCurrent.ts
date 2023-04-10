import view from "./ChatCurrent.hbs";
import { Dispatch, Extract, Subscribe } from "../../../../../../core/State.ts";
import { OnMobile } from "../../../../../../utils/on-mobile";
import { Component } from "../../../../../../core/Component";
import { IChat, IUser } from "../../../../../../core/interfaces";
import "./ChatCurrent.scss";

export class ChatCurrent extends Component {
  chat: IChat | null = null;
  usersAvatars: Array<string>;
  usersCountAvatar: number | string = 0;
  chatUsers: IUser[] = [];

  constructor() {
    super(view);
  }

  connectedCallback(): void {
    this.chat = null;
    this.usersAvatars = [];
    this.usersCountAvatar = 0;
    this.chatUsers = [];

    this.subscriber = Subscribe("currentChat", this.chatChanged);
  }

  chatChanged = (chat: IChat | "loading"): void => {
    if (chat === "loading") {
      this.loading();
    } else {
      this.chat = chat;
      this.usersAvatars = [];
      this.chatUsers = Extract("chatUsers");
      Object.values(this.chatUsers)
        .slice(3)
        .forEach((u) => this.usersAvatars.push(u.avatar));
      this.usersCountAvatar =
        Object.keys(this.chatUsers).length < 10
          ? Object.keys(this.chatUsers).length
          : "99+";
      this.render(
        {
          ...this.chat,
          usersAvatars: this.usersAvatars,
          usersCountAvatar: this.usersCountAvatar,
          showAvatars: this.usersAvatars.length > 0,
        },
        [
          { selector: "#back", event: "click", cb: OnMobile.showLeftPanel },
          {
            selector: "#chat-profile-btn",
            event: "click",
            cb: this.openChatProfile,
          },
        ]
      );
    }
  };

  openChatProfile = (): void => {
    Dispatch("rightMode", "chatProfile");
  };
}
