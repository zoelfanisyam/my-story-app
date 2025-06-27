import { loginModel } from "../../../data/api.js";
import LoginView from "../login/loginView.js";

export default class LoginPresenter {
  constructor() {
    this.view = new LoginView(this);
  }

  async render() {
    return this.view.render();
  }

  async afterRender() {
    this.view.afterRender();
  }

  async handleLogin(email, password) {
    try {
      const result = await loginModel.login(email, password);
      localStorage.setItem("token", result.loginResult.token);
      this.view.showMessage(`✅ ${result.message}`, true);
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          window.location.hash = "/home";
        });
      } else {
        window.location.hash = "/home";
      }
    } catch (error) {
      this.view.showMessage(`❌ ${error.message}`, false);
    }
  }
}
