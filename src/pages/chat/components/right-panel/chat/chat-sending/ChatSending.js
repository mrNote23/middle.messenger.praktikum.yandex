import view from "./ChatSending.hbs";
import { RenderTo } from "../../../../../../core/RenderTo.js";
import "./ChatSending.scss";

export class ChatSending extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    RenderTo(this, view);
  }
}
