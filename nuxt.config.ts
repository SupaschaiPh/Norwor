// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    "@nuxtjs/tailwindcss",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@nuxt/content",
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  routeRules: {
    "/**": { ssr: false },
    "api/**": { cors: false },
  },
  runtimeConfig: {
    ADMIN_USERNAME: "admin",
    ADMIN_PASSWORD: "admin@admin",
    SECRETKEY: "kakakaku".padStart(32, "ka"),
    DB_PATH: "",
    DOCKER_INGEST_URI: "", // https://nginx
    public: {
      INGEST_SERVER: "", // 127.0.0.1
    }
  },
});
