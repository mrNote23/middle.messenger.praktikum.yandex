import view from "./FileAttachment.hbs";
import { Component } from "../../../core/Component";
import "./FileAttachment.scss";

export class FileAttachment extends Component {
  constructor() {
    super(view);
  }

  connected() {
    this.style.width = "100%";
    this.render({ fileName: this.props.fileName });
  }
}
