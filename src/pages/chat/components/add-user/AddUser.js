import view from "./AddUser.hbs";
import "./AddUser.scss";

export const AddUser = () => {
  const mw = document.createElement("modal-window");
  mw.title = "Add user";
  mw.innerHTML = view();
  document.body.appendChild(mw);

  const submitForm = (e) => {
    e.preventDefault();
    e.target.removeEventListener("submit", submitForm);
    mw.remove();
  };

  document
    .getElementById("add-user-form")
    .addEventListener("submit", submitForm);
};
