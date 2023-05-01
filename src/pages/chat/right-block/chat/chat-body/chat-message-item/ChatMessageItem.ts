import view from "./ChatMessageItem.hbs";
import { Component } from "../../../../../../core/Component";
import { IChatMessageItem } from "../../../../../../core/config/interfaces";
import { dateConvert } from "../../../../../../utils/date-convert";
import { RES_URL } from "../../../../../../core/API/endpoints";
import { mediaContainer } from "../../../../../../utils/media-container";
import State from "../../../../../../core/State";
import { ADMIN } from "../../../../../../core/config/types";

export class ChatMessageItem extends Component {
  private _message: IChatMessageItem;
  private _adminId: number;
  private _dividerDate = "";

  constructor() {
    super(view);
    this._adminId = State.extract(ADMIN).id;
  }

  propsChanged() {
    if (this.props) {
      this._dividerDate = "";
      if (this.previousElementSibling) {
        if (
          new Date(this.props.message.time).getDay() !==
          new Date(
            (this.previousElementSibling as Component).props.message.time
          ).getDay()
        ) {
          this._dividerDate = dateConvert(this.props.message.time, "D-M-Y");
        }
      } else {
        this._dividerDate = dateConvert(this.props.message.time, "D-M-Y");
      }

      this._message = {
        ...(<IChatMessageItem>this.props.message),
        time: dateConvert(this.props.message.time, "h:i"),
      };

      if (this._message.type === "message") {
        this.render({
          ...this._message,
          isAdmin: this._adminId === this.props.message.user_id,
          dividerDate: this._dividerDate,
        });
      } else if (this._message.type === "file" && this._message.file) {
        const media: Component = mediaContainer(
          this._message.file.content_type.split("/")[0]
        );
        media.props.src = `${RES_URL}${this._message.file.path}`;
        media.props.fileName = this._message.file.filename;
        media.props.inChat = true;

        this.render({
          ...this._message,
          content: "",
          isAdmin: this._adminId === this.props.message.user_id,
          dividerDate: this._dividerDate,
        });

        this.querySelector(".message").classList.add("file");
        this.querySelector(".message span").appendChild(media);
      }
    }
  }
}
