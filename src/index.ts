import "./assets/scss";
import { appInit } from "./core/appInit";
import Router from "./core/Router";

import { RouterComponent } from "./shared/router-component/RouterComponent";
import { RouterLink } from "./shared/router-link/RouterLink";
import { LoginPage } from "./pages/auth/login-page/LoginPage";
import { RegisterPage } from "./pages/auth/register-page/RegisterPage";
import { ErrorPage } from "./pages/misc/error-page/ErrorPage";
import { ChatPage } from "./pages/chat/ChatPage";
import { FormValidator } from "./shared/form-validator/FormValidator";
import { ModalWindowComponent } from "./shared/modal-window/ModalWindow";

customElements.define("app-router", RouterComponent);
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
  Router.use({
    path: "/",
    content: `<chat-page class="wrapper"></chat-page>`,
  })
    .use({
      path: "/login",
      content: `<login-page class="wrapper"></login-page>`,
    })
    .use({
      path: "/register",
      content: `<register-page class="wrapper"></register-page>`,
    })
    .use({
      path: "/404",
      content: `<error-page class="wrapper">404</error-page>`,
    })
    .use({
      path: "/500",
      content: `<error-page class="wrapper">500</error-page>`,
    })
    .use({
      path: "*",
      redirect: `/404`,
    })
    .start(main);
};
