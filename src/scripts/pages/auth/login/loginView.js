export default class LoginView {
  constructor(presenter) {
    this.presenter = presenter;
  }

  render() {
    return `
      <section class="auth-section">
        <h1>Login Page</h1>
        <form id="loginForm">
          <div>
            <label for="email">Email</label>
            <input type="email" id="email" required placeholder="Enter your email" />
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" id="password" required placeholder="Enter your password" />
          </div>
          <a href="/#/register">Register</a>
          <button type="submit">Login</button>
        </form>
        <p id="loginMessage"></p>
      </section>
    `;
  }

  afterRender() {
    document.querySelector("header").style.display = "none";
    document.querySelector("footer").style.display = "none";

    const form = document.getElementById("loginForm");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.email.value;
      const password = form.password.value;
      this.presenter.handleLogin(email, password);
    });
  }

  showMessage(message, isSuccess) {
    const messageElement = document.getElementById("loginMessage");
    messageElement.innerText = message;
    messageElement.style.color = isSuccess ? "green" : "red";
  }
}
