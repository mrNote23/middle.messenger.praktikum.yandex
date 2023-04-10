import { ModalWindowComponent } from "./components/modal-window/ModalWindow";
import { ChatsList } from "../pages/chat/components/left-panel/chats-list/ChatsList";
import { UsersList } from "../pages/chat/components/left-panel/users-list/UsersList";
import { ChatCurrent } from "../pages/chat/components/right-panel/chat/chat-current/ChatCurrent";
import { ChatBody } from "../pages/chat/components/right-panel/chat/chat-body/ChatBody";
import { ChatSending } from "../pages/chat/components/right-panel/chat/chat-sending/ChatSending";
import { AdminProfile } from "../pages/chat/components/right-panel/admin-profile/AdminProfile";
import { UserProfile } from "../pages/chat/components/right-panel/user-profile/UserProfile";
import { ChatProfile } from "../pages/chat/components/right-panel/chat-profile/ChatProfile";
import { MainRouter } from "../main-router/MainRouter";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { ErrorPage } from "../pages/misc/ErrorPage";
import { ChatPage } from "../pages/chat/ChatPage";
import { LeftPanel } from "../pages/chat/components/left-panel/LeftPanel";
import { RightPanel } from "../pages/chat/components/right-panel/RightPanel";

window.customElements.define("modal-window", ModalWindowComponent);

window.customElements.define("chats-list", ChatsList);
window.customElements.define("users-list", UsersList);
window.customElements.define("chat-current", ChatCurrent);
window.customElements.define("chat-body", ChatBody);
window.customElements.define("chat-sending", ChatSending);

window.customElements.define("admin-profile", AdminProfile);
window.customElements.define("user-profile", UserProfile);
window.customElements.define("chat-profile", ChatProfile);

window.customElements.define("main-router", MainRouter);
window.customElements.define("login-page", LoginPage);
window.customElements.define("register-page", RegisterPage);
window.customElements.define("error-page", ErrorPage);

window.customElements.define("chat-page", ChatPage);
window.customElements.define("left-panel", LeftPanel);
window.customElements.define("right-panel", RightPanel);
