import { languages, namespaces } from "../lib/i18n";

function loadLocales() {
  // Load all locales, required for next-i18n-static-site
  const locales = {};
  languages.map((language) => {
    locales[language] = {};
    namespaces.map((namespace) => {
      locales[language][namespace] = require("./../locales/" +
        language +
        "/" +
        namespace +
        ".json");
    });
  });
  return locales;
}

export default loadLocales;