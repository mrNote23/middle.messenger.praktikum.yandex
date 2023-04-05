import view from "../add-chat/AddChat.hbs";
import "./AddChat.scss";

export const AddChat = () => {
  const mw = document.createElement("modal-window");
  mw.title = "Add new chat";
  mw.innerHTML = view();
  document.body.appendChild(mw);

  const submitForm = (e) => {
    e.preventDefault();
    e.target.removeEventListener("submit", submitForm);
    mw.remove();
  };

  document
    .getElementById("add-chat-form")
    .addEventListener("submit", submitForm);
};
