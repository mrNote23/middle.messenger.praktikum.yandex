import view from "./ChatPage.hbs";
import { TSwitchRoute } from "../../shared/content-switch/ContentSwitch";
import { Component } from "../../core/Component";
import { LeftBlock } from "./left-block/LeftBlock";
import { ChatHeader } from "./right-block/chat/chat-header/ChatHeader";
import { ChatBody } from "./right-block/chat/chat-body/ChatBody";
import { ChatFooter } from "./right-block/chat/chat-footer/ChatFooter";
import { AdminProfile } from "./right-block/profiles/admin-profile/AdminProfile";
import { UserProfile } from "./right-block/profiles/user-profile/UserProfile";
import { ChatProfile } from "./right-block/profiles/chat-profile/ChatProfile";
import { AudioAttachment } from "../../shared/attachments/audio-attachment/AudioAttachment";
import { VideoAttachment } from "../../shared/attachments/video-attachment/VideoAttachment";
import { FileAttachment } from "../../shared/attachments/file-attachment/FileAttachment";
import { ImageAttachment } from "../../shared/attachments/image-attachment/ImageAttachment";
import { MessagesDivider } from "../../shared/messages-divider/MessagesDivider";
import { STATES } from "../../core/config/types";
import { AuthController } from "../../core/controllers/AuthController";
import { rightRoutes } from "./right-block/rightRoutes";
import Router from "../../core/Router";
import "./ChatPage.scss";

customElements.define("left-block", LeftBlock);

customElements.define("chat-header", ChatHeader);
customElements.define("chat-body", ChatBody);
customElements.define("chat-footer", ChatFooter);
customElements.define("admin-profile", AdminProfile);
customElements.define("user-profile", UserProfile);
customElements.define("chat-profile", ChatProfile);

customElements.define("audio-attachment", AudioAttachment);
customElements.define("video-attachment", VideoAttachment);
customElements.define("image-attachment", ImageAttachment);
customElements.define("file-attachment", FileAttachment);
customElements.define("messages-divider", MessagesDivider);

export class ChatPage extends Component {
  private _router: Component;
  rightRoutes: TSwitchRoute[];

  constructor() {
    super(view);
    this.rightRoutes = rightRoutes;
    this.className = "wrapper";
  }

  connected() {
    AuthController.auth().then((res) => {
      if (res) {
        this.render();
        Router.currentRoute.cb && Router.currentRoute.cb();

        this._router = <Component>document.getElementById("right-router");

        this.addSubscriber(STATES.RIGHT_MODE, this._changedMode);
      }
    });
  }

  private _changedMode = (val: string): void => {
    this._router.props.path = val;
    this._router.setAttribute("path", val);
  };
}
