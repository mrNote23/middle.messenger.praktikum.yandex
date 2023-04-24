import "./assets/scss";
import { App } from "./App";

customElements.define("main-app", App);
document.getElementById("root").innerHTML = `<main-app></main-app>`;
