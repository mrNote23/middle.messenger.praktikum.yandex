import view from "./ChatFooter.hbs";
import { Component } from "../../../../../core/Component";
import { STATES } from "../../../../../core/ChatApp";
import "./ChatFooter.scss";
import WS from "../../../../../core/WS";

export class ChatFooter extends Component {
  message = "";

  constructor() {
    super(view);
  }

  onChange = <T>(e: T): void => {
    this.message = e.target.value;
    e.key === "Enter" && this.sendMessage();
  };

  sendMessage = (): void => {
    if (this.message.length) {
      WS.send({ type: "message", content: this.message });
      this.message = "";
      this.render();
      this.getElementsByTagName("input")[0].focus();
    }
  };

  addAttachment = (e) => {
    this.querySelector<unknown>("#attachment")["click"]();
  };

  onAttachment = (e) => {
    console.log(e.target.files[0]);
    const img = document.createElement("img");
    img.style.width = "100px";
    img.style.height = "100px";
    const reader = new FileReader();
    reader.onload = function () {
      img.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
    this.querySelector(".message-attach").appendChild(img);
  };

  connected(): void {
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
