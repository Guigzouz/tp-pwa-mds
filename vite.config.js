import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: { enabled: true },
      workbox: {
        navigateFallback: "/index.html",
        globPatterns: ["**/*.{js,css,html,png,svg,jpg,jpeg,json}"],
      },
      manifest: {
        name: "Vite PWA",
        short_name: "VitePWA",
        theme_color: "#ffffff",
        icons: [
          {
            src: "144.png",
            sizes: "144x144",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
