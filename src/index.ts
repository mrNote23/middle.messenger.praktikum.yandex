import "./assets/scss";
import { appInit } from "./core/appInit";
import Router from "./core/Router";

import { ContentSwitch } from "./shared/content-switch/ContentSwitch";
import { RouterLink } from "./shared/router-link/RouterLink";
import { LoginPage } from "./pages/auth/login-page/LoginPage";
import { RegisterPage } from "./pages/auth/register-page/RegisterPage";
import { ErrorPage } from "./pages/misc/error-page/ErrorPage";
import { ChatPage } from "./pages/chat/ChatPage";
import { FormValidator } from "./shared/form-validator/FormValidator";
import { ModalWindowComponent } from "./shared/modal-window/ModalWindow";
import { routes } from "./core/config/routes";

customElements.define("content-switch", ContentSwitch);
customElements.define("router-link", RouterLink);
customElements.define("login-page", LoginPage);
customElements.define("register-page", RegisterPage);
customElements.define("error-page", ErrorPage);
customElements.define("chat-page", ChatPage);
customElements.define("form-validator", FormValidator);
customElements.define("modal-window", ModalWindowComponent);

window.onload = () => {
  document.querySelector(".pre-loader")?.remove();
  const main = document.createElement("main");
  document.body.appendChild(main);

  appInit();
  Router.use(routes.root)
    .use(routes.chatsList)
    .use(routes.chat)
    .use(routes.chatProfile)
    .use(routes.usersList)
    .use(routes.userProfile)
    .use(routes.profile)
    .use(routes.login)
    .use(routes.register)
    .use(routes.route404)
    .use(routes.route500)
    .use(routes.undefined)
    .start(main);
};
