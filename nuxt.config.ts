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
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  primevue: {
    components: {
      prefix: 'Prime',
    },
  },
  app: {
    head: {
      title: 'PREvant Payload Producer',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      noscript: [{ children: 'Javascript is required' }],
    },
  },
  runtimeConfig: {
    public: {
      dockerImageByServiceName: 'kafka:docker.io/confluentinc/cp-kafka,prevant:docker.io/aixigo/prevant',
      envConfigPrefix: 'NUXT_',
      enableConfigToEnv: 'false',
    },
  },
})
