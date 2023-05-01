import { TRoute } from "../shared/content-switch/ContentSwitch";

class Router {
  routes: TRoute[] = [];
  currentRoute: TRoute;
  target: HTMLElement;
  history: History;
  lastContent = "";

  constructor() {
    this.history = window.history;
  }

  use(route: TRoute) {
    this.routes.push(route);
    return this;
  }

  start(target: HTMLElement) {
    this.target = target;
    // new MutationObserver(this._mutationObserver).observe(this.target, {
    //   subtree: true,
    //   childList: true,
    // });
    window.addEventListener("popstate", <T>(e: T) => {
      e.preventDefault();
      this.go(e.currentTarget.location.pathname, false);
    });
    this.go(window.location.pathname);
  }

  go(path: string, pushState = true): void {
    if (!path) {
      return;
    }

    const res = this._findRoute(path.split("/"));
    if (res) {
      if (res.redirect) {
        this.go(res.redirect);
        return;
      } else if (res.content) {
        this.currentRoute = res;
        if (this.lastContent !== res.content) {
          this.target.innerHTML = res.content;
          this.lastContent = res.content;
        } else {
          res.cb && res.cb();
        }
      }
    } else {
      this.go("/*");
    }

    if (pushState) {
      this.history.pushState({}, "", path);
    } else {
      this.history.replaceState({}, "", path);
    }
  }

  _findRoute = (path: Array<string>): TRoute | null => {
    if (this.routes.length) {
      const route = this.routes.find(
        (route) => route.path.split("/")[1] === path[1]
      );
      if (!route) {
        return null;
      }
      let result = true;
      const params = {};
      const tmpRoutePath = route.path.split("/");
      for (let idx = 2; idx < path.length; idx++) {
        if (!tmpRoutePath[idx]) {
          result = false;
        }
        if (tmpRoutePath[idx] && tmpRoutePath[idx].startsWith(":")) {
          params[tmpRoutePath[idx].replace(":", "")] = path[idx];
        } else {
          if (tmpRoutePath[idx] !== path[idx]) {
            result = false;
          }
        }
      }
      if (result) {
        return { ...route, params };
      }
      return null;
    } else {
      return null;
    }
  };

  // _mutationObserver = (mutationList, observer) => {
  //   console.log(mutationList);
  // };
}

export default new Router();
