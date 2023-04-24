import view from "./ChatFooter.hbs";
import { Component } from "../../../../../core/Component";
import ChatApp, { STATES } from "../../../../../core/ChatApp";
import "./ChatFooter.scss";
import WS from "../../../../../core/WS";

export class ChatFooter extends Component {
  message = "";
  attach: File | null = null;

  constructor() {
    super(view);
  }

  onChange = <T>(e: T): void => {
    this.message = e.target.value;
    e.key === "Enter" && this.sendMessage();
  };

  sendMessage = (): void => {
    if (this.message.length || this.attach) {
      ChatApp.sendMessage(this.message, this.attach);
      this.message = "";
      this.attach = null;
      this.render();
      this.getElementsByTagName("input")[0].focus();
    }
  };

  removeAttachment = () => {
    this.querySelector(".attach-container").innerHTML = "";
    this.querySelector(".message-attach").classList.add("hidden");
    this.attach = null;
  };

  addAttachment = (e) => {
    this.querySelector<unknown>("#attachment")["click"]();
  };

  onAttachment = (e) => {
    this.querySelector(".attach-container").innerHTML = "";
    this.attach = e.target.files[0];

    const fileType = e.target.files[0].type.split("/")[0];
    let attach: HTMLElement;
    switch (fileType) {
      case "image":
        attach = document.createElement("image-attachment");
        break;
      case "audio":
        attach = document.createElement("audio-attachment");
        break;
      case "video":
        attach = document.createElement("video-attachment");
        break;
      default:
        attach = document.createElement("file-attachment");
        break;
    }

    const reader = new FileReader();
    reader.onload = () => {
      attach.props.src = reader.result;
      attach.props.fileName = e.target.files[0].name;
      this.querySelector(".attach-container").appendChild(attach);
      this.querySelector(".message-attach").classList.remove("hidden");
    };
    reader.readAsDataURL(e.target.files[0]);

    attach.props.fileName = e.target.files[0].name;
    this.querySelector(".attach-container").appendChild(attach);
    this.querySelector(".message-attach").classList.remove("hidden");
  };

  connected(): void {
    this.attach = null;
    this.addSubscriber(STATES.CURRENT_CHAT, (val) => {
      if (val && val !== "loading") {
        this.style.display = "flex";
        this.render({ message: this.message });
        this.getElementsByTagName("input")[0].focus();
      } else {
        this.style.display = "none";
      }
    });
  }
}
