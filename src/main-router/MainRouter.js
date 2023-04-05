import { routes } from "./routes.js";

export const navigate = (path) => {
  const router = document.getElementsByTagName("main-router");
  router[0] && router[0].setAttribute("path", path);
};

export class MainRouter extends HTMLElement {
  constructor() {
    super();
    this.routes = routes;
  }

  connectedCallback() {
    window.addEventListener("popstate", (e) => {
      this.navigate(e.currentTarget.location.pathname, false);
    });

    document.addEventListener("click", (e) => {
      if (
        e.target.tagName === "A" &&
        e.target.classList.contains("router-link")
      ) {
        e.preventDefault();
        const route = e.target.getAttribute("href");
        this.navigate(route);
      }
    });

    this.navigate(window.location.pathname);
  }

  disconnectedCallback() {}

  navigate(route, pushState = true) {
    const res = this.routes.find((elm) => {
      if (elm.path === route) {
        return elm;
      }
    });
    if (res) {
      this.innerHTML = res.content;
      if (pushState) {
        window.history.pushState({}, "", route);
      }
    } else {
      this.navigate("/404");
    }
  }

  static get observedAttributes() {
    return ["path"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    name === "path" && this.navigate(newValue);
  }
}
