import view from "./VideoAttachment.hbs";
import { Component } from "../../core/Component";
import "./VideoAttachment.scss";

export class VideoAttachment extends Component {
  video: HTMLVideoElement;

  constructor() {
    super(view);
  }

  connected() {
    if (this.props.src) {
      this.style.width = "100%";
      this.render({ fileName: this.props.fileName });
      this.video = this.querySelector(".video-container video");
      this.video.src = <string>this.props.src;
    }
  }

  disconnected = () => {
    if (this.video) {
      this.video.pause();
      this.video.remove();
    }
  };
}
