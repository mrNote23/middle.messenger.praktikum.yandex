import { Component, TProps } from "../../../../../../core/Component";
import view from "./ChatMessageItem.hbs";
import { IChatMessageItem } from "../../../../../../core/config/interfaces";
import { dateConvert } from "../../../../../../utils/date-convert";

export class ChatMessageItem extends Component {
  message: IChatMessageItem;
  isAdmin: boolean;

  constructor() {
    super(view);
  }

  connected() {
    this.getProps.then((props: TProps) => {
      this.message = {
        ...props.message,
        time: dateConvert(props.message.time),
      };
      this.isAdmin = props.adminid === this.message.user_id;
      this.render({ ...this.message, isAdmin: this.isAdmin });
    });
  }
}
