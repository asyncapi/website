module.exports = {
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
    namespaces: ['landing-page', 'common', 'tools', 'footer'],
    defaultNamespace: 'landing-page',
    react: { useSuspense: false },// this line
  },
  langMap: {
    en: 'English',
    de: 'Deutsch',
  },
};
