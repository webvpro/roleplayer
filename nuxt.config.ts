// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    '@nuxt/devtools',
  ],
  components: {
    dirs: [
      {
        path: '~/components/global',
        global: true,
      },
      '~/components',
    ],
  },
  colorMode: {
    preference: 'wireframe', // default theme
    dataValue: 'theme', // activate data-theme in <html> tag
    classSuffix: '',
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    VERIFY_EMAIL: process.env.VERIFY_EMAIL,
    public: {
      DISCORD_LOGIN_REDIRECT: process.env.DISCORD_LOGIN_REDIRECT,
      APPWRITE_ENDPOINT: process.env.APPWRITE_ENDPOINT,
      APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
      CSRD_COMPENDIUM_FILE_ID: process.env.CSRD_COMPENDIUM_FILE_ID,
      PUBLIC_COMPENDIUMS_BUCKET: process.env.PUBLIC_COMPENDIUMS_BUCKET,
    },
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },

  devtools: {
    // Enable devtools (default: true)
    enabled: true,
    // VS Code Server options
    //vscode: {},
    // ...other options
  },
});
