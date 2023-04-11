import view from "./MainButton.hbs";
import { Component } from "../core/Component";

export class MainButton extends Component {
  value: number = 15;

  constructor() {
    super(view);
  }

  test = (e) => {
    console.log(e.target);
  };

  connectedCallback() {
    this.render({
      handler: this.test,
    });
  }
}
