import view from "./LoginPage.hbs";
import { RenderTo } from "../../core/RenderTo.js";
import { navigate } from "../../main-router/MainRouter.js";
import "./auth.scss";

export class LoginPage extends HTMLElement {
  constructor() {
    super();
  }

  render = () => {
    RenderTo(this, view, {});
  };

  loginProcess = (e) => {
    e.preventDefault();
    navigate("/");
  };

  connectedCallback() {
    RenderTo(this, view, {}, [
      { selector: "#login-form", event: "submit", cb: this.loginProcess },
    ]);
  }
}
