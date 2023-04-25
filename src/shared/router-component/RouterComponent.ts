import { Component } from "../../core/Component";

export type TRoute = {
  path: string;
  content?: string;
  redirect?: string;
  auth?: boolean;
};

export class RouterComponent extends Component {
  constructor() {
    super();
  }

  propsChanged() {
    this._fill(this.getAttribute("path"));
  }

  private _fill(path: string): void {
    if (!path) {
      return;
    }
    if (this.props.routes) {
      let res = this._findRoute(path);
      if (res) {
        // если роут найден
        if (res.redirect) {
          // если есть редирект, то обработаем его в первую очередь
          this._fill(res.redirect);
          return;
        } else if (res.content) {
          // если есть контент то выведем его
          this.innerHTML = res.content;
        }
      } else {
        // заданный роут не найден, значит ищем роут "*", если есть то используем его, иначе ничего не делаем
        res = this._findRoute("*");
        if (res) {
          this._fill("*");
        }
      }
    }
  }

  private _findRoute = (path: string): TRoute | null => {
    if (this.props.routes) {
      return this.props.routes.find((elm) => {
        if (elm.path === path) {
          return elm;
        }
      });
    } else {
      return null;
    }
  };

  static get observedAttributes(): Array<string> {
    return ["path"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    if (name === "path" && newValue !== oldValue) {
      this._fill(newValue);
    }
  }
}
