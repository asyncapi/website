import { i18n } from '../next-i18next-static-site.config';

/**
 * Converts languages like 'en-US' to 'en'.
 * @param {string} code - The language code to convert.
 * @returns {string} The converted base language code.
 */
const convertLanguageCode = (code: string): string => {
  const baseLanguageCode = code.split('-')[0];
  return baseLanguageCode;
};

/**
 * Detects the browser language based on user settings.
 * @returns {string} The detected language code.
 */
function browserLanguageDetector(): string {
  // Fetch the language stored inside localStorage
  const localStorageLanguage = localStorage.getItem('i18nLang');

  if (localStorageLanguage) {
    return localStorageLanguage;
  }

  // Load available languages from i18n object
  const availableLanguages: string[] = i18n.languages;

  // Load user's default languages from browser settings
  const browserDefaultLanguages: readonly string[] = navigator.languages;

  const convertedLanguages: string[] = browserDefaultLanguages.map((code) =>
    convertLanguageCode(code)
  );

  // Check if the top priority language is available inside i18n object
  for (let i = 0; i < convertedLanguages.length; i++) {
    if (availableLanguages.includes(convertedLanguages[i])) {
      return convertedLanguages[i];
    }
  }
  // Default to 'en' in all other cases
  return 'en';
}

export default browserLanguageDetector;
