import { defineConfig } from "vite";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/my-story-app/",
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, "src", "public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "public/service-worker.js",
          dest: ".",
        },
      ],
    }),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "injectManifest",
      filename: "service-worker.js",
      // injectManifest: {
      //   swSrc: resolve(__dirname, "src/public/service-worker.js"),
      //   swDest: "service-worker.js",
      // },
      includeAssets: [
        "favicon.ico",
        "icons/icon-192x192.png",
        "icons/icon-512x512.png",
      ],
      manifest: {
        name: "Story App",
        short_name: "Story",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#204842",
        icons: [
          {
            src: "icons/favicon-144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "icons/favicon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/story-api\.dicoding\.dev\/v1\//,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 86400,
              },
            },
          },
        ],
      },
    }),
  ],
});
