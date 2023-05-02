import view from "./ChatFooter.hbs";
import { Component } from "../../../../../core/Component";
import { mediaContainer } from "../../../../../utils/media-container";
import { MAX_UFS, MAX_UFSS } from "../../../../../core/API/endpoints";
import { MessagesController } from "../../../../../core/controllers/MessagesController";
import { STATES } from "../../../../../core/config/types";
import "./ChatFooter.scss";

export class ChatFooter extends Component {
  private _message = "";
  private _attach: File | null = null;

  constructor() {
    super(view);
  }

  connected() {
    this._attach = null;
    this.addSubscriber(STATES.CURRENT_CHAT, this._chatChanged);
  }

  private _chatChanged = (val): void => {
    if (val && val !== "loading") {
      this.style.display = "flex";
      this.render({ message: this._message });
      this.getElementsByTagName("input")[0].focus();
    } else {
      this.style.display = "none";
    }
  };

  onChange = <T>(e: T): void => {
    this._message = e.target.value;
    e.key === "Enter" && this.sendMessage();
  };

  sendMessage = async () => {
    if (this._message.length || this._attach) {
      await MessagesController.sendMessage(this._message, this._attach);
      this._message = "";
      this._attach = null;
      this.render();
      this.getElementsByTagName("input")[0].focus();
    }
  };

  removeAttachment = (): void => {
    this.querySelector(".attach-container").innerHTML = "";
    this.querySelector(".message-attach").classList.add("hidden");
    this._attach = null;
    this.querySelector<HTMLInputElement>("#attachment").value = "";
  };

  addAttachment = (): void => {
    this.querySelector<unknown>("#attachment")["click"]();
  };

  onAttachment = <T>(e: T): void => {
    if (!e.target.files.length) {
      return;
    }
    this.querySelector(".attach-container").innerHTML = "";
    this._attach = <File>e.target.files[0];

    if (this._attach.size > MAX_UFS) {
      this.querySelector(
        ".error-container"
      ).innerHTML = `<p class="color-danger text-left">File too large! Max file size ${MAX_UFSS}</p>`;
      setTimeout(() => {
        this.querySelector(".error-container").innerHTML = "";
      }, 5000);
      this.removeAttachment();
      return;
    }
    const media: Component = mediaContainer(this._attach.type.split("/")[0]);

    const reader = new FileReader();
    reader.onload = (): void => {
      media.props.src = reader.result;
      media.props.fileName = this._attach?.name;
      this.querySelector(".attach-container").appendChild(media);
      this.querySelector(".message-attach").classList.remove("hidden");
    };
    reader.readAsDataURL(this._attach);

    media.props.fileName = this._attach.name;
    this.querySelector(".attach-container").appendChild(media);
    this.querySelector(".message-attach").classList.remove("hidden");
  };
}
