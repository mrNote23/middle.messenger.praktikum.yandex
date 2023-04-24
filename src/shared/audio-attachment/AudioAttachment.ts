import view from "./AudioAttachment.hbs";
import { Component } from "../../core/Component";
import "./AudioAttachment.scss";
import { mediaTimeConvert } from "../../utils/media-time-convert";

export class AudioAttachment extends Component {
  audio: HTMLAudioElement;
  playing = false;
  timer: number;
  duration: number;
  currentTime: number = 0;
  slider: number = 0;

  constructor() {
    super(view);
  }

  connected() {
    if (this.props.src) {
      this.style.width = "100%";
      if (!this.audio) {
        this.audio = document.createElement("audio");
        this.audio.preload = "metadata";
      }
      this.audio.src = <string>this.props.src;
      this.audio.load();
      this.audio.onloadedmetadata = () => {
        this.duration = this.audio.duration;
        this.addListener(this.audio, "ended", this.audioEnded);
        this._render();
      };
    }
  }

  _render = () => {
    this.render({
      playing: this.playing,
      duration: mediaTimeConvert(this.duration),
      currentTime: mediaTimeConvert(this.currentTime),
      slider: this.slider,
      fileName: this.props.fileName,
    });
  };

  audioEnded = () => {
    this.playing = false;
    clearInterval(this.timer);
    this.audio.currentTime = 0;
    this.slider = 0;
    this._render();
  };

  audioControl = () => {
    if (this.playing) {
      this.audio.pause();
      this.playing = false;
      this.timer && clearInterval(this.timer);
    } else {
      this.audio.play();
      this.playing = true;
      this.timer = setInterval(this.seekUpdate.bind(this), 1000);
    }
    this._render();
  };

  seekTo = (e) => {
    this.audio.currentTime = this.audio.duration * (e.target.value / 100);
    this.seekUpdate();
  };

  seekUpdate = () => {
    if (!isNaN(this.audio.duration)) {
      this.slider = Math.floor(
        this.audio.currentTime * (100 / this.audio.duration)
      );
      this.getElementsByTagName("input")[0].value = this.slider.toString();
      this.querySelector(".current-time").textContent = mediaTimeConvert(
        this.audio.currentTime
      );
      this.currentTime = this.audio.currentTime;
    }
  };

  disconnected = () => {
    if (this.audio) {
      this.audio.pause();
      this.audio.remove();
    }
  };
}
