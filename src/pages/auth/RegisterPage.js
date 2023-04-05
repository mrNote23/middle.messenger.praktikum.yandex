import view from "./RegisterPage.hbs";
import { RenderTo } from "../../core/RenderTo.js";
import { navigate } from "../../main-router/MainRouter.js";
import "./auth.scss";

export class RegisterPage extends HTMLElement {
  constructor() {
    super();
  }

  render = () => {
    RenderTo(this, view, {});
  };

  registerProcess = (e) => {
    e.preventDefault();
    navigate("/");
  };

  connectedCallback() {
    RenderTo(this, view, {}, [
      { selector: "#register-form", event: "submit", cb: this.registerProcess },
    ]);
  }
}
