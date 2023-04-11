import { routes, TRoute } from "./routes.ts";
import { Component } from "../../core/Component";

export const navigate = (path: string): void => {
  const router = document.getElementsByTagName("main-router");
  router[0] && router[0].setAttribute("path", path);
};

export class MainRouter extends Component {
  routes: TRoute[];

  constructor() {
    super();
    this.routes = routes;
  }

  connectedCallback(): void {
    window.addEventListener("popstate", (e: any) => {
      this.navigate(e.currentTarget.location.pathname, false);
    });

    document.addEventListener("click", (e: any) => {
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

  navigate(pathName: string, pushState: boolean = true): void {
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
