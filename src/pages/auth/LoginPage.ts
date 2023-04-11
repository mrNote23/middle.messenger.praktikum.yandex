import view from "./LoginPage.hbs";
import { Component } from "../../core/Component";
import { navigate } from "../../ui/main-router/MainRouter";
import "./auth.scss";

export class LoginPage extends Component {
  constructor() {
    super(view);
  }

  loginProcess = <T>(e: T): void => {
    e.preventDefault();
    navigate("/");
  };

  connectedCallback(): void {
    this.render();
  }
}
