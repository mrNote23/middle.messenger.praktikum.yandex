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

customElements.define("modal-window", ModalWindowComponent);

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
