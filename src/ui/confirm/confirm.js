import view from "./confirm.hbs";

export const Confirm = (props, cb) => {
  const mw = document.createElement("modal-window");
  mw.title = props.title;
  mw.innerHTML = view({ ...props });
  document.body.appendChild(mw);

  const submitForm = (e) => {
    e.preventDefault();
    e.target.removeEventListener("submit", submitForm);
    mw.remove();
    cb();
  };

  const resetForm = (e) => {
    e.preventDefault();
    e.target.removeEventListener("reset", resetForm);
    mw.remove();
  };

  document
    .getElementById("confirm-form")
    .addEventListener("submit", submitForm);

  document.getElementById("confirm-form").addEventListener("reset", resetForm);
};
