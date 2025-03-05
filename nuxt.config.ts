// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@pinia/nuxt", "vue3-carousel-nuxt", "@nuxtjs/apollo"],
  apollo: {
    clients: {
      default: {
        httpEndpoint: "https://graph.aggregator.hahujobs.io/v1/graphql",
        defaultOptions: {
          query: {
            fetchPolicy: "no-cache",
          },
        },
      },
    },
  },
});
