import { defineNuxtConfig } from "nuxt/config";

const config = useRuntimeConfig();

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      restApiUrl: "http://localhost:3001/api",
    },
  },
  ssr: true,

  app: {
    rootId: "green",
    head: {
      meta: [
        { name: "description", content: "лаборатория greenbabyborn'a" },
        {
          name: "keywords",
          content:
            "зеленый ребенок родился, greenbabyborn, зеленыйребенокродился, гринбейбиборн, green baby born, зеленый блог",
        },
        { name: "robots", content: "all" },
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
  routeRules: {
    // "/blog/**": { swr: true },
    // "/admin/**": { ssr: false },
  },
  modules: ["@nuxtjs/color-mode", "@sidebase/nuxt-auth", "@pinia/nuxt"],
  auth: {
    origin: "http://localhost:3000",
    // Configuration of the global auth-middleware (only applies if you set `enableGlobalAppMiddleware: true` above!)
    globalMiddlewareOptions: {
      // Whether to allow access to 404 pages without authentication. Set this to `false` to force users to sign-in before seeing `404` pages. Setting this to false may lead to vue-router problems (as the target page does not exist)
      allow404WithoutAuth: true,
      // Whether to automatically set the callback url to the page the user tried to visit when the middleware stopped them. This is useful to disable this when using the credentials provider, as it does not allow a `callbackUrl`. Setting this to a string-value will result in that being used as the callbackUrl path. Note: You also need to set the global `addDefaultCallbackUrl` setting to `false` if you want to fully disable this for the global middleware.
      addDefaultCallbackUrl: true,
    },
  },
  colorMode: {
    preference: "system",
    fallback: "light",
    storageKey: "theme",
  },
});
