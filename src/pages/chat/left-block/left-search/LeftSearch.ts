import view from "./LeftSearch.hbs";
import { Component } from "../../../../core/Component";
import "./LeftSearch.scss";
import { TEventTarget } from "../../../../core/config/types";

export class LeftSearch extends Component {
  constructor() {
    super(view);
  }

  onSearch = (e: TEventTarget): void => {
    console.log(`Search: ${e.target.value}`);
  };

  connected() {
    this.render();
  }
}
