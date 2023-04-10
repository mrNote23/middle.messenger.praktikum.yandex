import view from "./RegisterPage.hbs";
import { Component } from "../../core/Component";
import { navigate } from "../../main-router/MainRouter.ts";
import "./auth.scss";

export class RegisterPage extends Component {
  constructor() {
    super(view);
  }

  registerProcess = <T>(e: T): void => {
    e.preventDefault();
    navigate("/");
  };

  connectedCallback(): void {
    this.render({}, [
      { selector: "#register-form", event: "submit", cb: this.registerProcess },
    ]);
  }
}
