import { defineNuxtModule, addPrerenderRoutes } from '@nuxt/kit'


export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  devtools: { enabled: true },
  tailwindcss: {
    config: {
      plugins: [require("@tailwindcss/typography")],
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/sitemap",
    "@nuxt/content",
  ],
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            // Default theme (same as single string)
            default: "min-light",
            // Theme used if `html.dark`
            dark: "min-dark",
          },
        },
      },
    },
  },
  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storage: "localStorage", // or 'sessionStorage' or 'cookie'
    storageKey: "nuxt-color-mode",
  },
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
  compatibilityDate: "2025-03-27",
});
