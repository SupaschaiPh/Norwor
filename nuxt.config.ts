// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    '@nuxt/content'
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  routeRules:{
    "/**":{ssr:false},
    "api/**":{ cors: false },
  },
  runtimeConfig:{
    ADMIN_USERNAME:process.env?.ADMIN_USERNAME || "admin",
    ADMIN_PASSWORD:process.env?.ADMIN_PASSWORD || "admin@admin",
    SECRETKEY : process.env?.SECRETKEY || "kakakaku".padStart(32,"ka"),
    DB_PATH : process.env?.DB_PATH
  }
});
