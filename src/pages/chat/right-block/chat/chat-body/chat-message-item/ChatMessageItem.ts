import view from "./ChatMessageItem.hbs";
import { Component } from "../../../../../../core/Component";
import { IChatMessageItem } from "../../../../../../core/config/interfaces";
import { dateConvert } from "../../../../../../utils/date-convert";
import { RES_URL } from "../../../../../../core/API/endpoints";
import { mediaContainer } from "../../../../../../utils/media-container";
import State from "../../../../../../core/State";
import { ADMIN } from "../../../../../../core/config/types";

export class ChatMessageItem extends Component {
  message: IChatMessageItem | object;
  adminId: number;
  dividerDate = "";

  constructor() {
    super(view);
    this.adminId = State.extract(ADMIN).id;
  }

  propsChanged() {
    if (this.props) {
      this.dividerDate = "";
      if (this.previousElementSibling) {
        if (
          new Date(this.props.message.time).getDay() !==
          new Date(this.previousElementSibling.props.message.time).getDay()
        ) {
          this.dividerDate = dateConvert(this.props.message.time, "D-M-Y");
        }
      } else {
        this.dividerDate = dateConvert(this.props.message.time, "D-M-Y");
      }

      this.message = {
        ...this.props.message,
        time: dateConvert(this.props.message.time, "h:i"),
      };

      if (this.message.type === "message") {
        this.render({
          ...this.message,
          isAdmin: this.adminId === this.props.message.user_id,
          dividerDate: this.dividerDate,
        });
      } else if (this.message.type === "file" && this.message.file) {
        const media: HTMLElement = mediaContainer(
          this.message.file.content_type.split("/")[0]
        );
        media.props.src = `${RES_URL}${this.message.file.path}`;
        media.props.fileName = this.message.file.filename;
        media.props.inChat = true;

        this.render({
          ...this.message,
          content: "",
          isAdmin: this.adminId === this.props.message.user_id,
          dividerDate: this.dividerDate,
        });

        this.querySelector(".message").classList.add("file");
        this.querySelector(".message span").appendChild(media);
      }
    }
  }
}
