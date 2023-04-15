import view from "./LeftSearch.hbs";
import { Component } from "../../../../core/Component";
import "./LeftSearch.scss";

export class LeftSearch extends Component {
  constructor() {
    super(view);
  }

  onSearch = <T>(e: T): void => {
    console.log(`Search: ${e.target.value}`);
  };

  connected(): void {
    this.render();
  }
}
