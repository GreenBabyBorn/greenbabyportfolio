import { defineNuxtConfig } from "nuxt/config";
import { $fetch } from "ofetch";

export default defineNuxtConfig({
  ogImage: {
    playground: false,
  },
  routeRules: {
    "/admin/**": { index: false },
    "/blog/**": { sitemap: { changefreq: "always", priority: 0.8 } },
  },
  sitemap: {
    xsl: false,
    urls: async () => {
      const blogPages = await $fetch(
        `${process.env.NUXT_PUBLIC_REST_API_URL}/posts`
      );
      return blogPages.map((page) => ({
        loc: `/blog/${page.slug}`,
        lastmod: page.updatedAt,
        changefreq: "daily",
        priority: 0.8,
      }));
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      // failOnError: false,
      routes: ["/sitemap.xml", "/robots.txt"],
    },
  },
  runtimeConfig: {
    public: {
      // restApiUrl: "http://localhost:3001/api",
      // appUrl: "http://localhost:3000",
      restApiUrl: process.env.NUXT_PUBLIC_REST_API_URL,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      yandexMetrika: {
        id: process.env.YANDEX_METRIKA_ID,
      },
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
  // routeRules: {
  //   // "/blog/**": { swr: true },
  //   // "/admin/**": { ssr: false },
  // },
  modules: [
    "@nuxtjs/color-mode",
    "@sidebase/nuxt-auth",
    "@pinia/nuxt",
    "nuxt-simple-sitemap",
    "nuxt-og-image",
    "yandex-metrika-module-nuxt3",
  ],

  auth: {
    origin: process.env.AUTH_ORIGIN,
    enableSessionRefreshOnWindowFocus: true,
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
