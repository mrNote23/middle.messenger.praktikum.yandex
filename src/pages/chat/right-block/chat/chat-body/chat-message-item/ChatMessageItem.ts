import view from "./ChatMessageItem.hbs";
import { Component } from "../../../../../../core/Component";
import { IChatMessageItem } from "../../../../../../core/config/interfaces";
import { dateConvert } from "../../../../../../utils/date-convert";
import { RES_URL } from "../../../../../../core/config/endpoints";

export class ChatMessageItem extends Component {
  message: IChatMessageItem | object;
  isAdmin: boolean;

  constructor() {
    super(view);
  }

  propsChanged() {
    if (this.props) {
      this.message = {
        ...this.props.message,
        time: dateConvert(this.props.message.time),
      };
      this.isAdmin = this.props.adminid === this.props.message.user_id;
      if (this.message.type === "message") {
        this.render({ ...this.message, isAdmin: this.isAdmin });
      } else if (this.message.type === "file" && this.message.file) {
        const fileType = this.message.file.content_type.split("/")[0];
        let media: HTMLElement;
        switch (fileType) {
          case "image":
            media = document.createElement("image-attachment");
            break;
          case "audio":
            media = document.createElement("audio-attachment");
            break;
          case "video":
            media = document.createElement("video-attachment");
            break;
          default:
            media = document.createElement("file-attachment");
            break;
        }
        media.props.src = `${RES_URL}${this.message.file.path}`;
        media.props.fileName = this.message.file.filename;
        media.props.inChat = true;

        this.render({
          ...this.message,
          content: "",
          isAdmin: this.isAdmin,
        });

        this.querySelector(".message").classList.add("file");
        this.querySelector(".message").appendChild(media);
      }
    }
  }
}
