import "./assets/scss";
import { App } from "./App";

window.customElements.define("main-app", App);

window.document.getElementById("root").innerHTML = `<main-app></main-app>`;
