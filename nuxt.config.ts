// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    'nuxt-appwrite'
  ],
  colorMode: {
    preference: 'wireframe', // default theme
    dataValue: 'theme', // activate data-theme in <html> tag
    classSuffix: ''
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  appwrite: {
    endpoint: process.env.AW_ENDPOINT,
    project: process.env.AW_PROJECT_ID
  },
  runtimeConfig: {
    VERIFY_EMAIL: process.env.VERIFY_EMAIL,
    public: {
      DISCORD_LOGIN_REDIRECT: process.env.DISCORD_LOGIN_REDIRECT,
    },
  },
})
