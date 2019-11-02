import { observable, action, decorate } from "mobx";

class UserModel {
  constructor() {
    this.UserTheme =
      typeof window === "undefined"
        ? "light"
        : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  }
  ToggleUserTheme() {
    const val = this.UserTheme === "light" ? "dark" : "light";
    this.UserTheme = val;
    document.body.setAttribute("data-theme", val);
  }
}

decorate(UserModel, {
  UserTheme: observable,
  ToggleUserTheme: action
});

const UserStore = new UserModel();

export default UserStore;
