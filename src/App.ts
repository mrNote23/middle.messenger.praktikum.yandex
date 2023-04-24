import view from "./App.hbs";
import { Component } from "./core/Component";
import { RouterComponent } from "./shared/router-component/RouterComponent";
import { LoginPage } from "./pages/auth/login-page/LoginPage";
import { RegisterPage } from "./pages/auth/register-page/RegisterPage";
import { ErrorPage } from "./pages/misc/error-page/ErrorPage";
import { ChatPage } from "./pages/chat/ChatPage";
import { RouterLink } from "./shared/router-link/RouterLink";
import ChatApp from "./core/ChatApp";

import { rootRoutes } from "./core/config/rootRoutes";

customElements.define("router-link", RouterLink);

customElements.define("login-page", LoginPage);
customElements.define("register-page", RegisterPage);
customElements.define("error-page", ErrorPage);
customElements.define("chat-page", ChatPage);

customElements.define("app-router", RouterComponent);

export class App extends Component {
  rootRoutes;

  constructor() {
    super(view);
    this.rootRoutes = rootRoutes;
  }

  connected() {
    ChatApp.init();
    this.render();
    ChatApp.start();
  }
}
