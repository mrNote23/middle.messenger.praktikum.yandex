export type TRoute = {
  path: string;
  content?: string;
  redirect?: string;
  cb?: () => void;
};
export type TRoutes = { [key: string]: TRoute };

class Router {
  private _routes: TRoute[] = [];
  private _target: HTMLElement;
  private _lastContent = "";
  history: History;
  currentRoute: TRoute;

  constructor() {
    this.history = window.history;
  }

  use(route: TRoute): Router {
    this._routes.push(route);
    return this;
  }

  start(target: HTMLElement): void {
    this._target = target;
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
        if (this._lastContent !== res.content) {
          this._target.innerHTML = res.content;
          this._lastContent = res.content;
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
    if (this._routes.length) {
      const route = this._routes.find(
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
}

export default new Router();
