import view from "./ChatMessageItem.hbs";
import { Component } from "../../../../../../core/Component";
import { IChatMessageItem } from "../../../../../../core/config/interfaces";
import { dateConvert } from "../../../../../../utils/date-convert";

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
      this.render({ ...this.message, isAdmin: this.isAdmin });
    }
  }
}
