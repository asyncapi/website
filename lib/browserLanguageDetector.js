const { i18n } = require("./../next-i18next-static-site.config");

// Converts languages like 'en-US' to 'en'
const convertLanguageCode = (code) => {
    const baseLanguageCode = code.split('-')[0];
    return baseLanguageCode;
};

function browserLanguageDetector() {

    // Fetch the language stored inside localStorage
    const localStorageLanguage = localStorage.getItem('i18nLang');

    if (localStorageLanguage) {
        return localStorageLanguage;
    }

    // Load available languages from i18n object
    const availableLanguages = i18n.languages;

    // Load user's default languages from browser settings
    const browserDefaultLanguages = navigator.languages;

    const convertedLanguages = browserDefaultLanguages.map((code) => convertLanguageCode(code));

    // Check if the top priority language is available inside i18n object
    for (var i = 0; i < convertedLanguages.length; i++) {
        if (availableLanguages.includes(convertedLanguages[i])) {
            return convertedLanguages[i];
        }
    }
    // Default to 'en' in all other cases
    return 'en';
}

export default browserLanguageDetector;