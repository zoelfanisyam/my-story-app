import { precacheAndRoute } from "workbox-precaching";
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("push", (event) => {
  console.log("[Service worker] push event received");

  event.waitUntil(
    (async () => {
      let title = "Notifikasi";
      let options = {
        body: "Ada pesan baru.",
        icon: "/icon.png",
      };

      if (event.data) {
        try {
          const data = event.data.json();
          title = data.title || title;
          options.body = data.body || options.body;
        } catch (err) {
          const text = event.data.text();
          options.body = data.options.body || options.body;
        }
      }

      await self.registration.showNotification(title, options);
    })()
  );
});

// self.addEventListener("fetch", (event) => {
//   if (event.request.destination === "image") {
//     event.respondWith(
//       caches.open(IMAGE_CACHE).then(async (cache) => {
//         const cachedResponse = await cache.match(event.request);
//         if (cachedResponse) return cachedResponse;

//         try {
//           const networkResponse = await fetch(event.request);
//           cache.put(event.request, networkResponse.clone());
//           return networkResponse;
//         } catch (error) {
//           return caches.match("/images/minus.png");
//         }
//       })
//     );
//   }
// });

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll([
//         "/",
//         "/index.html",
//         "/images/minus.png",
//         "/icons/favicon-144.png",
//         "/icons/favicon-512.png",
//         "/manifest.webmanifest",
//         "/src/styles/main.css",
//         "/src/scripts/main.js",
//       ]);
//     })
//   );
// });

// self.addEventListener("activate", (event) => {
//   const cacheWhitelist = [CACHE_NAME, IMAGE_CACHE];
//   event.waitUntil(
//     caches
//       .keys()
//       .then((cacheNames) =>
//         Promise.all(
//           cacheNames.map((cacheName) => {
//             if (!cacheWhitelist.includes(cacheName)) {
//               return caches.delete(cacheName);
//             }
//           })
//         )
//       )
//       .then(() => self.clients.claim())
//   );
// });
