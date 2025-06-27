import routes from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";
import {
  requestPermissionAndSubscribe,
  unsubscribePush,
  checkPushSubscription,
} from "../utils/push-notification";

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this.#setupDrawer();
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener("click", () => {
      this.#navigationDrawer.classList.toggle("open");
    });

    document.body.addEventListener("click", (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove("open");
      }

      this.#navigationDrawer.querySelectorAll("a").forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove("open");
        }
      });
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url];

    this.#content.innerHTML = await page.render();
    await page.afterRender();

    const token = localStorage.getItem("token");

    const subscribeBtn = document.getElementById("subscribe-btn");
    const unsubscribeBtn = document.getElementById("unsubscribe-btn");

    if (subscribeBtn && unsubscribeBtn) {
      const isSubscribed = await checkPushSubscription();

      if (isSubscribed) {
        subscribeBtn.style.display = "none";
        unsubscribeBtn.style.display = "inline-block";
      } else {
        subscribeBtn.style.display = "inline-block";
        unsubscribeBtn.style.display = "none";
      }

      subscribeBtn.addEventListener("click", async () => {
        if (!token) {
          alert("Silakan login terlebih dahulu untuk berlangganan notifikasi.");
          return;
        }

        try {
          await requestPermissionAndSubscribe(token);
          alert("Berhasil berlangganan notifikasi!");

          subscribeBtn.style.display = "none";
          unsubscribeBtn.style.display = "inline-block";
        } catch (error) {
          alert("Gagal berlangganan notifikasi: " + error.message);
        }
      });

      unsubscribeBtn.addEventListener("click", async () => {
        try {
          await unsubscribePush();
          alert("Berhasil berhenti berlangganan notifikasi.");

          subscribeBtn.style.display = "inline-block";
          unsubscribeBtn.style.display = "none";
        } catch (error) {
          alert("Gagal berhenti berlangganan: " + error.message);
        }
      });
    }
  }
}

export default App;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
