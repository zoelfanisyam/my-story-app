export default class RegisterView {
  constructor(presenter) {
    this.presenter = presenter;
  }

  render() {
    return `
      <section class="auth-section">
        <h1>Register User</h1>
        <form id="registerForm">
          <div>
            <label for="name">Name</label>
            <input type="text" id="name" required />
          </div>
          <div>
            <label for="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" id="password" required minlength="8" />
          </div>
          <a href="/login">Login</a>
          <button type="submit">Register</button>
        </form>
        <p id="message"></p>
      </section>
    `;
  }

  afterRender() {
    document.querySelector("header").style.display = "none";
    document.querySelector("footer").style.display = "none";
    const form = document.getElementById("registerForm");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      this.presenter.handleRegister(name, email, password);
    });
  }

  showMessage(text, isSuccess = true) {
    const message = document.getElementById("message");
    message.innerText = isSuccess ? `✅ ${text}` : `❌ ${text}`;
    message.style.color = isSuccess ? "green" : "red";
  }

  resetForm() {
    const form = document.getElementById("registerForm");
    form.reset();
  }
}
