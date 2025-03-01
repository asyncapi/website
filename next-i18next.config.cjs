// The file is required to be named next-i18next.config.cjs so we can use it in next.config.js.
// https://github.com/i18next/next-i18next/issues/2185#issuecomment-1618307556
process.env.I18NEXT_DEFAULT_CONFIG_PATH = './next-i18next.config.cjs';

module.exports = {
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
    namespaces: ['landing-page', 'common', 'tools'],
    defaultNamespace: 'landing-page',
    react: { useSuspense: false } // this line
  },
  langMap: {
    en: 'English',
    de: 'Deutsch'
  }
};
