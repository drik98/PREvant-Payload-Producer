// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    'primeflex/primeflex.css',
    'primevue/resources/primevue.css',
    'primevue/resources/themes/lara-dark-green/theme.css',
    'primeicons/primeicons.css',
  ],
  modules: [
    'nuxt-primevue',
  ],
  primevue: {
    components: {
      prefix: 'Prime',
    },
  },
})
