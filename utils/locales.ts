import { languages, namespaces } from './i18n';

/**
 * Loads all locales.
 * @returns {object} - Returns an object containing all locales.
 */
function loadLocales(): Record<string, Record<string, any>> {
  // Load all locales, required for next-i18n-static-site
  const locales: Record<string, Record<string, any>> = {};
  languages.map((language) => {
    locales[language] = {};
    namespaces.map((namespace) => {
      locales[language][
        namespace
      ] = require(`./../locales/${language}/${namespace}.json`);
    });
  });
  return locales;
}

export default loadLocales;
