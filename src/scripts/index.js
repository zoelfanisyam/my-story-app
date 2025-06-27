// CSS imports
import "../styles/styles.css";

import App from "./pages/app";

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.querySelector("#main-content"),
    drawerButton: document.querySelector("#drawer-button"),
    navigationDrawer: document.querySelector("#navigation-drawer"),
  });
  await app.renderPage();

  window.addEventListener("hashchange", async () => {
    await app.renderPage();
  });
});

// Script skip to conten
document.addEventListener("DOMContentLoaded", () => {
  const skipLink = document.querySelector(".skip-to-content");

  skipLink.addEventListener("click", function (e) {
    e.preventDefault();

    setTimeout(() => {
      const mainContent = document.getElementById("main-content");

      if (mainContent) {
        mainContent.setAttribute("tabindex", "-1");
        mainContent.focus();
      }
    }, 100);
  });
});
