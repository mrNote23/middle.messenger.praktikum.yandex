import view from "./ImageAttachment.hbs";
import { Component } from "../../core/Component";
import "./ImageAttachment.scss";

export class ImageAttachment extends Component {
  constructor() {
    super(view);
  }

  connected() {
    this.render({ fileName: this.props.fileName });
    this.querySelector(".image-container img").src = <string>this.props.src;
  }
}
