import view from "./AddUser.hbs";
import { ModalWindow } from "../../../../../shared/modal-window/ModalWindow";
import { Component } from "../../../../../core/Component";
import { IUser } from "../../../../../core/config/interfaces";
import { RES_URL } from "../../../../../core/API/endpoints";
import { UserController } from "../../../../../core/controllers/UserController";
import "./AddUser.scss";

class AddUserComponent extends Component {
  private _timeout: number;
  private _users: IUser[];
  private _user: IUser;
  private _inputValue = "";
  private _userNode: HTMLElement;

  constructor() {
    super(view);
  }

  connected() {
    this.render();
  }

  onInput = <T>(e: T): void => {
    this._inputValue = e.target.value.replace(/[^а-яa-z0-9-]+/gi, "");
    e.target.value = this._inputValue;
    clearTimeout(this._timeout);
    if (this._inputValue === "") {
      this.render({ users: [], inputValue: this._inputValue, empty: false });
      this.querySelector<HTMLInputElement>(".form-control").focus();
      return;
    }
    this._timeout = setTimeout(() => {
      UserController.searchUser(e.target.value).then((res: IUser[]) => {
        this._users = res.map((elm) => {
          return {
            ...elm,
            avatar: elm.avatar
              ? `${RES_URL}${elm.avatar}`
              : `/images/no-avatar.jpg`,
          };
        });
        let empty = false;
        if (this._inputValue !== "" && !this._users.length) {
          empty = true;
        }
        this.render({
          users: this._users,
          inputValue: this._inputValue,
          empty,
        });
        this.querySelector<HTMLInputElement>(".form-control").focus();
        this.querySelector<HTMLInputElement>(".form-control").setSelectionRange(
          this._inputValue.length,
          this._inputValue.length
        );
      });
    }, 500);
  };

  selectUser = <T>(e: T): void => {
    if (this._userNode) {
      this._userNode.classList.remove("active");
    }
    this._userNode = e.target.closest("li");
    this._userNode.classList.add("active");
    this._user = this._users.find(
      (user) => user.id === parseInt(this._userNode.dataset.id)
    );
  };

  addUser = (): void => {
    UserController.addUser(this._user);
    this.createEvent("finish", null);
  };

  notNow = (): void => {
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

  modalWindow.node.querySelector<HTMLInputElement>(".form-control").focus();

  function closeWindow() {
    modalWindow.remove();
  }
};
