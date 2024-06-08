import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      // restApiUrl: "http://localhost:3001/api",
      // appUrl: "http://localhost:3000",
      restApiUrl: process.env.NUXT_PUBLIC_REST_API_URL,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      // yandexMetrika: {
      //   id: process.env.YANDEX_METRIKA_ID,
      // },
    },
  },
  ssr: true,
  app: {
    rootId: "green",
    head: {
      meta: [
        { name: "description", content: "лаборатория зелёнорождённого" },
        {
          name: "keywords",
          content:
            "зеленый ребенок родился, greenbabyborn, зеленыйребенокродился, гринбейбиборн, green baby born, зеленый блог",
        },
        { name: "author", content: "greenbabyborn" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/favicon-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },

  modules: ["@nuxtjs/color-mode", "@pinia/nuxt", "nuxt-yandex-metrika"],
  yandexMetrika: {
    id: "94783808",
    // debug: process.env.NODE_ENV !== "production",
    // delay: 0,
    // cdn: false,
    // verification: null, // Verification in Yandex Webmaster
    // options: {
    //  webvisor: true
    // },
  },

  colorMode: {
    preference: "system",
    fallback: "light",
    storageKey: "theme",
  },
});
