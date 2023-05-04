import view from "./AudioAttachment.hbs";
import { Component } from "../../../core/Component";
import { mediaTimeConvert } from "../../../utils/media-time-convert";
import "./AudioAttachment.scss";

export class AudioAttachment extends Component {
  private _audio: HTMLAudioElement;
  private _playing = false;
  private _timer: NodeJS.Timer;
  private _duration: number;
  private _currentTime = 0;
  private _slider = 0;

  constructor() {
    super(view);
  }

  connected() {
    if (this.props.src) {
      this.style.width = "100%";
      if (!this._audio) {
        this._audio = document.createElement("audio");
        this._audio.preload = "metadata";
      }
      this._audio.src = <string>this.props.src;
      this._audio.load();
      this._audio.onloadedmetadata = () => {
        this._duration = this._audio.duration;
        this.addListener(this._audio, "ended", this._audioEnded);
        this._render();
      };
    }
  }

  audioControl = async () => {
    if (this._playing) {
      this._audio.pause();
      this._playing = false;
      this._timer && clearInterval(this._timer);
    } else {
      await this._audio.play();
      this._playing = true;
      this._timer = setInterval(this._seekUpdate.bind(this), 1000);
    }
    this._render();
  };

  seekTo = (e) => {
    this._audio.currentTime = this._audio.duration * (e.target.value / 100);
    this._seekUpdate();
  };

  private _render = () => {
    this.render({
      playing: this._playing,
      duration: mediaTimeConvert(this._duration),
      currentTime: mediaTimeConvert(this._currentTime),
      slider: this._slider,
      fileName: this.props.fileName,
    });
  };

  private _audioEnded = () => {
    this._playing = false;
    clearInterval(this._timer);
    this._audio.currentTime = 0;
    this._slider = 0;
    this._render();
  };

  private _seekUpdate = () => {
    if (!isNaN(this._audio.duration)) {
      this._slider = Math.floor(
        this._audio.currentTime * (100 / this._audio.duration)
      );
      this.getElementsByTagName("input")[0].value = this._slider.toString();
      this.querySelector(".current-time").textContent = mediaTimeConvert(
        this._audio.currentTime
      );
      this._currentTime = this._audio.currentTime;
    }
  };

  disconnected = () => {
    if (this._audio) {
      this._audio.pause();
      this._audio.remove();
    }
  };
}
