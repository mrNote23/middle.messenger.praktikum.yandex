import { TRoute } from "../shared/router-component/RouterComponent";

class Router {
  routerComponent: HTMLElement;
  routes: TRoute[] = [];

  use(route: TRoute) {
    this.routes.push(route);
    return this;
  }

  start(obj: HTMLElement) {
    this.routerComponent = document.createElement("app-router");
    this.routerComponent.props.routes = this.routes;
    obj.appendChild(this.routerComponent);

    window.addEventListener("popstate", <T>(e: T) => {
      this.go(e.currentTarget.location.pathname, false);
    });
    this.go(window.location.pathname);
  }

  go(path: string, pushState = true): void {
    if (this.routerComponent) {
      this.routerComponent.props.path = path;
      pushState && window.history.pushState({}, "", path);
    }
  }
}

export default new Router();
