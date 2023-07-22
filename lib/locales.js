import { languages, namespaces } from "next-i18next-static-site";

// Load all locales, required for next-i18n-static-site
// Can be changed based on your folder structure
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

export default locales;