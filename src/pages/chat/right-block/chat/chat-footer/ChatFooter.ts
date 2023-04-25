import view from "./ChatFooter.hbs";
import { Component } from "../../../../../core/Component";
import ChatApp, { STATES } from "../../../../../core/ChatApp";
import { mediaContainer } from "../../../../../utils/media-container";
import "./ChatFooter.scss";
import { MAX_UFS, MAX_UFSS } from "../../../../../core/config/endpoints";

export class ChatFooter extends Component {
  message = "";
  attach: File | null = null;

  constructor() {
    super(view);
  }

  connected(): void {
    this.attach = null;
    this.addSubscriber(STATES.CURRENT_CHAT, this.chatChanged);
  }

  chatChanged = (val): void => {
    if (val && val !== "loading") {
      this.style.display = "flex";
      this.render({ message: this.message });
      this.getElementsByTagName("input")[0].focus();
    } else {
      this.style.display = "none";
    }
  };

  onChange = (e: InputEvent): void => {
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
    this.querySelector("#attachment").value = "";
  };

  addAttachment = () => {
    this.querySelector<unknown>("#attachment")["click"]();
  };

  onAttachment = (e) => {
    if (!e.target.files.length) {
      return;
    }
    this.querySelector(".attach-container").innerHTML = "";
    this.attach = <File>e.target.files[0];

    if (this.attach.size > MAX_UFS) {
      this.querySelector(
        ".error-container"
      ).innerHTML = `<p class="color-danger text-left">File too large! Max file size ${MAX_UFSS}</p>`;
      setTimeout(() => {
        this.querySelector(".error-container").innerHTML = "";
      }, 5000);
      this.removeAttachment();
      return;
    }
    const media: HTMLElement = mediaContainer(this.attach.type.split("/")[0]);

    const reader = new FileReader();
    reader.onload = () => {
      media.props.src = reader.result;
      media.props.fileName = this.attach.name;
      this.querySelector(".attach-container").appendChild(media);
      this.querySelector(".message-attach").classList.remove("hidden");
    };
    reader.readAsDataURL(this.attach);

    media.props.fileName = this.attach.name;
    this.querySelector(".attach-container").appendChild(media);
    this.querySelector(".message-attach").classList.remove("hidden");
  };
}
