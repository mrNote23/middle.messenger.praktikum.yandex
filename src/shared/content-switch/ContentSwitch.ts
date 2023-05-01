import { Component } from "../../core/Component";

export type TRoute = {
  path: string;
  content?: string;
  redirect?: string;
  cb?: () => void;
};

export class ContentSwitch extends Component {
  constructor() {
    super();
  }

  propsChanged(prop, oldValue, newValue) {
    if (prop === "path" && oldValue !== newValue) {
      this._fill(newValue);
    }
  }

  private _fill(path: string): void {
    if (!path) {
      return;
    }
    if (this.props.routes) {
      let res = this._findRoute(path);
      if (res) {
        if (res.redirect) {
          this._fill(res.redirect);
          return;
        } else if (res.content) {
          this.innerHTML = res.content;
        }
      } else {
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
}
