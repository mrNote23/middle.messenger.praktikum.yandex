import { routes, TRoute } from "./routes.ts";
import { Component } from "../core/Component";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { ErrorPage } from "../pages/misc/ErrorPage";
import { ChatPage } from "../pages/chat/ChatPage";

window.customElements.define("login-page", LoginPage);
window.customElements.define("register-page", RegisterPage);
window.customElements.define("error-page", ErrorPage);
window.customElements.define("chat-page", ChatPage);

export class MainRouter extends Component {
  routes: TRoute[];

  constructor() {
    super();
    this.routes = routes;
  }

  connectedCallback(): void {
    window.addEventListener("popstate", <T>(e: T) => {
      this.navigate(e.currentTarget.location.pathname, false);
    });

    document.addEventListener("click", <T>(e: T) => {
      if (
        e.target.tagName === "A" &&
        e.target.classList.contains("router-link")
      ) {
        e.preventDefault();
        const pathName = e.target.getAttribute("href");
        this.navigate(pathName);
      }
    });

    this.navigate(window.location.pathname);
  }

  navigate(pathName: string, pushState = true): void {
    const res = this.routes.find((elm) => {
      if (elm.path === pathName) {
        return elm;
      }
    });
    if (res) {
      this.innerHTML = res.content;
      if (pushState) {
        window.history.pushState({}, "", pathName);
      }
    } else {
      this.navigate("/404");
    }
  }

  static get observedAttributes(): Array<string> {
    return ["path"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    name === "path" && this.navigate(newValue);
  }
}
