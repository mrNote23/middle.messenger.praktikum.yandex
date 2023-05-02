import view from "./MessagesDivider.hbs";
import { Component } from "../../core/Component";
import "./MessagesDivider.scss";

export class MessagesDivider extends Component {
  constructor() {
    super(view);
  }

  connected() {
    this.render({ date: this.getAttribute("date") });
  }
}
