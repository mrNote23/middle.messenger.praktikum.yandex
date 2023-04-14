import view from "./SearchComponent.hbs";
import { Component } from "../../../../core/Component";
import "./SearchComponent.scss";

export class SearchComponent extends Component {
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
