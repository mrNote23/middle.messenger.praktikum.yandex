import view from "./AddUser.hbs";
import { ModalWindow } from "../../../../../shared/modal-window/ModalWindow";
import { Component } from "../../../../../core/Component";
import { IUser } from "../../../../../core/config/interfaces";
import { RES_URL } from "../../../../../core/API/endpoints";
import { UserController } from "../../../../../core/controllers/UserController";
import "./AddUser.scss";

class AddUserComponent extends Component {
  timeout: number;
  users: IUser[];
  user: IUser;
  inputValue = "";
  userNode: HTMLElement;

  constructor() {
    super(view);
  }

  connected() {
    this.render();
  }

  onInput = (e) => {
    this.inputValue = e.target.value.replace(/[^а-яa-z0-9-]+/gi, "");
    e.target.value = this.inputValue;
    clearTimeout(this.timeout);
    if (this.inputValue === "") {
      this.render({ users: [], inputValue: this.inputValue, empty: false });
      this.querySelector(".form-control").focus();
      return;
    }
    this.timeout = setTimeout(() => {
      UserController.searchUser(e.target.value).then((res: IUser[]) => {
        this.users = res.map((elm) => {
          return {
            ...elm,
            avatar: elm.avatar
              ? `${RES_URL}${elm.avatar}`
              : `/images/no-avatar.jpg`,
          };
        });
        let empty = false;
        if (this.inputValue !== "" && !this.users.length) {
          empty = true;
        }
        this.render({ users: this.users, inputValue: this.inputValue, empty });
        this.querySelector(".form-control").focus();
        this.querySelector(".form-control").setSelectionRange(
          this.inputValue.length,
          this.inputValue.length
        );
      });
    }, 500);
  };

  selectUser = (e) => {
    if (this.userNode) {
      this.userNode.classList.remove("active");
    }
    this.userNode = e.target.closest("li");
    this.userNode.classList.add("active");
    this.user = this.users.find(
      (user) => user.id === parseInt(this.userNode.dataset.id)
    );
  };

  addUser = () => {
    UserController.addUser(this.user);
    this.createEvent("finish", null);
  };

  notNow = () => {
    this.createEvent("finish", null);
  };
}

export const AddUser = (): void => {
  !window.customElements.get("add-user-component") &&
    window.customElements.define("add-user-component", AddUserComponent);

  const modalWindow = new ModalWindow(
    "Add user",
    `<add-user-component event-finish="[[closeWindow]]"></add-user-component>`,
    { closeWindow }
  );

  function closeWindow() {
    modalWindow.remove();
  }
};
