import view from "./App.hbs";
import { Component } from "./core/Component";
import { RouterComponent } from "./router-component/RouterComponent";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ErrorPage } from "./pages/misc/ErrorPage";
import { ChatPage } from "./pages/chat/ChatPage";

import { rootRoutes } from "./core/config/rootRoutes";

window.customElements.define("login-page", LoginPage);
window.customElements.define("register-page", RegisterPage);
window.customElements.define("error-page", ErrorPage);
window.customElements.define("chat-page", ChatPage);

window.customElements.define("root-router", RouterComponent);

export class App extends Component {
  rootRoutes;

  constructor() {
    super(view);
    this.rootRoutes = rootRoutes;
  }

  connectedCallback() {
    this.render();
  }
}
