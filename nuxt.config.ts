// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['primevue/resources/themes/lara-dark-green/theme.css'],
  modules: [
    'nuxt-primevue'
  ],
  primevue: {
    components: {
        prefix: 'Prime'
    },
  },
})
