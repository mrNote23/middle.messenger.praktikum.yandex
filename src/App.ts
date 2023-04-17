import view from "./App.hbs";
import { Component } from "./core/Component";
import { RouterComponent } from "./shared/router-component/RouterComponent";
import { LoginPage } from "./pages/auth/login-page/LoginPage";
import { RegisterPage } from "./pages/auth/register-page/RegisterPage";
import { ErrorPage } from "./pages/misc/error-page/ErrorPage";
import { ChatPage } from "./pages/chat/ChatPage";
import ChatApp from "./core/ChatApp";

import { rootRoutes } from "./core/config/rootRoutes";

window.customElements.define("login-page", LoginPage);
window.customElements.define("register-page", RegisterPage);
window.customElements.define("error-page", ErrorPage);
window.customElements.define("chat-page", ChatPage);

window.customElements.define("app-router", RouterComponent);

export class App extends Component {
  rootRoutes;

  constructor() {
    super(view);
    this.rootRoutes = rootRoutes;
  }

  connected() {
    ChatApp.start();
    this.render();
  }
}
