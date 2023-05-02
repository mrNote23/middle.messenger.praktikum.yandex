import view from "./VideoAttachment.hbs";
import { Component } from "../../../core/Component";
import "./VideoAttachment.scss";

export class VideoAttachment extends Component {
  private _video: HTMLVideoElement;

  constructor() {
    super(view);
  }

  connected() {
    if (this.props.src) {
      this.style.width = "100%";
      this.render({ fileName: this.props.fileName });
      this._video = this.querySelector(".video-container video");
      this._video.src = <string>this.props.src;
    }
  }

  disconnected = () => {
    if (this._video) {
      this._video.pause();
      this._video.remove();
    }
  };
}
