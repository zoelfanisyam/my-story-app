import { loginModel, registerModel } from "../../../data/api.js";
import RegisterView from "../register/registerView.js";

export default class RegisterPresenter {
  constructor() {
    this.view = new RegisterView(this);
  }

  async render() {
    return this.view.render();
  }

  async afterRender() {
    this.view.afterRender();
  }

  async handleRegister(name, email, password) {
    try {
      const result = await registerModel.register(name, email, password);
      this.view.showMessage(result.message, true);
      this.view.resetForm();
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          window.location.hash = "/";
        });
      } else {
        window.location.hash = "/";
      }
    } catch (err) {
      this.view.showMessage(err.message || "Failed to register user", false);
    }
  }
}
