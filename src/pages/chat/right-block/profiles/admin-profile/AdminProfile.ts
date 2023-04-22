import view from "./AdminProfile.hbs";
import State from "../../../../../core/State";
import { OnMobile } from "../../../../../utils/on-mobile";
import { Confirm } from "../../../../../shared/confirm/confirm";
import { Component } from "../../../../../core/Component";
import ChatApp, {
  ADMIN,
  LEFTMODE,
  RIGHTMODE,
  STATES,
} from "../../../../../core/ChatApp";
import { TFormValidatorConfig } from "../../../../../shared/form-validator/FormValidator";
import { formFields } from "./formFields";
import { IUser } from "../../../../../core/config/interfaces";

export class AdminProfile extends Component {
  admin: IUser | null;
  formFields: TFormValidatorConfig;

  constructor() {
    super(view);
    this.formFields = formFields;
  }

  connected(): void {
    this.addSubscriber(ADMIN, (val) => {
      this.admin = <IUser>val;
      this.render({ ...this.admin });
    });
  }

  changeAvatar = (e) => {
    if (e.target.files) {
      ChatApp.changeAdminAvatar(e.target.files[0]);
    }
  };

  formValidated = (e: CustomEvent): void => {
    Confirm({ title: "Are you sure?", text: "Update profile?" }, () => {
      console.log(e.detail);
      this.btnBack();
    });
  };

  btnLogout = (): void => {
    Confirm({ title: "Are you sure?", text: "Exit from chat?" }, () => {
      ChatApp.logout();
    });
  };

  btnBack = (): void => {
    OnMobile.showLeftPanel();
    if (window["prevLeftMode"]) {
      State.dispatch(STATES.LEFT_MODE, window["prevLeftMode"]);
      window["prevLeftMode"] = null;
    } else {
      State.dispatch(STATES.LEFT_MODE, LEFTMODE.CHATS);
    }

    if (window["prevRightMode"]) {
      State.dispatch(STATES.RIGHT_MODE, window["prevRightMode"]);
      window["prevRightMode"] = null;
    } else {
      State.dispatch(STATES.RIGHT_MODE, RIGHTMODE.CHAT);
    }
  };
}
