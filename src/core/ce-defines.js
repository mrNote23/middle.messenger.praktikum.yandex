import { ModalWindow } from "./components/modal-window/ModalWindow.js";
import { ChatsList } from "../pages/chat/components/left-panel/chats-list/ChatsList.js";
import { UsersList } from "../pages/chat/components/left-panel/users-list/UsersList.js";
import { ChatCurrent } from "../pages/chat/components/right-panel/chat/chat-current/ChatCurrent.js";
import { ChatBody } from "../pages/chat/components/right-panel/chat/chat-body/ChatBody.js";
import { ChatSending } from "../pages/chat/components/right-panel/chat/chat-sending/ChatSending.js";
import { AdminProfile } from "../pages/chat/components/right-panel/admin-profile/AdminProfile.js";
import { UserProfile } from "../pages/chat/components/right-panel/user-profile/UserProfile.js";
import { ChatProfile } from "../pages/chat/components/right-panel/chat-profile/ChatProfile.js";
import { MainRouter } from "../main-router/MainRouter.js";
import { LoginPage } from "../pages/auth/LoginPage.js";
import { RegisterPage } from "../pages/auth/RegisterPage.js";
import { ErrorPage } from "../pages/misc/ErrorPage.js";
import { ChatPage } from "../pages/chat/ChatPage.js";
import { LeftPanel } from "../pages/chat/components/left-panel/LeftPanel.js";
import { RightPanel } from "../pages/chat/components/right-panel/RightPanel.js";

customElements.define("modal-window", ModalWindow);

customElements.define("chats-list", ChatsList);
customElements.define("users-list", UsersList);
customElements.define("chat-current", ChatCurrent);
customElements.define("chat-body", ChatBody);
customElements.define("chat-sending", ChatSending);

customElements.define("admin-profile", AdminProfile);
customElements.define("user-profile", UserProfile);
customElements.define("chat-profile", ChatProfile);

customElements.define("main-router", MainRouter);
customElements.define("login-page", LoginPage);
customElements.define("register-page", RegisterPage);
customElements.define("error-page", ErrorPage);

customElements.define("chat-page", ChatPage);
customElements.define("left-panel", LeftPanel);
customElements.define("right-panel", RightPanel);
