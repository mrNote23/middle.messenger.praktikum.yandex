import view from "./RegisterPage.hbs";
import { Component } from "../../core/Component";
import { navigate } from "../../ui/main-router/MainRouter.ts";
import "./auth.scss";

export class RegisterPage extends Component {
  constructor() {
    super(view);
  }

  onKeyup = (e) => {
    console.log(e);
    console.log(e.target.form.elements);
  };
  submitForm = <T>(e: T): void => {
    e.preventDefault();
    navigate("/");
  };

  connectedCallback(): void {
    this.render({});
  }
}
