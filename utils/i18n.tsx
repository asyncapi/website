import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import i18next, { i18n, Module } from 'i18next';
import {
  initReactI18next,
  useTranslation,
  withTranslation,
  Translation,
  Trans,
} from 'react-i18next';
import nextI18nextStaticSiteConfig from '../next-i18next-static-site.config';
import HeadComponent from "../components/Head";

// Translation exports from react-i18next
export { useTranslation, withTranslation, Translation, Trans };
import App from "../pages/_app";
import { title } from 'process';
import { head } from 'lodash';
interface Config {
  languages: string[];
  defaultLanguage: string;
  namespaces: string[];
  defaultNamespace: string;
  allowHydration: boolean;
  cookieName: string;
}

const defaultConfig = {
  allowHydration: true,
  languages: ['en'],
  defaultLanguage: 'en',
  namespaces: ['common'],
  defaultNamespace: 'common',
  cookieName: 'lang',
  cookieOptions: { expires: 365, path: '/' },
};

const config: Config = {
  ...defaultConfig,
  languages: nextI18nextStaticSiteConfig.i18n.languages,
  defaultLanguage: nextI18nextStaticSiteConfig.i18n.defaultLanguage,
  namespaces: nextI18nextStaticSiteConfig.i18n.namespaces,
  defaultNamespace: nextI18nextStaticSiteConfig.i18n.defaultNamespace,
};

export const languages = config.languages;
export const defaultLanguage = config.defaultLanguage;
export const namespaces = config.namespaces;
export const defaultNamespace = config.defaultNamespace;
export const defaultNamespace2 = config.defaultNamespace;
export const cookieName = config.cookieName;

/**
 * Creates an i18next instance with the provided locales and language.
 * @param {Object} locales - The locales object containing translations for different languages and namespaces.
 * @param {string} language - The language code representing the desired language.
 * @returns {Object} - The initialized i18next instance.
 */
const createI18nextInstance = (locales: any, language: string): i18n => {
  // i18n plugins to load
  const plugins = [
    //
    initReactI18next,
  ];

  plugins.map((plugin: Module) => i18next.use(plugin));
  plugins.map((plugin: Module) => i18next.use(plugin)); // @fix: remove in future - https://github.com/vercel/next.js/issues/53688

  i18next.init({
    resources: locales,
    cleanCode: true,
    lng: language,
    supportedLngs: config.languages,
    fallbackLng: language ? language : config.defaultLanguage,
    ns: config.namespaces, // String or array of namespaces to load
    defaultNS: config.defaultNamespace, // Default namespace used if not passed to translation function
    interpolation: {
      escapeValue: false, // Not needed for react as it escapes by default
    },
    react: {
      useSuspense: false, // Not compatible with SSR
    },
    load: 'languageOnly', // Remove if you want to use localization (en-US, en-GB)
  });

  return i18next;
};

let globalI18nextInstance: any = null;

/**
 * Returns a singleton instance of the i18next object with the specified language and locales.
 * If the instance doesn't exist, it creates a new one; otherwise, it changes the language of the existing instance.
 * @param {string} language - The language code representing the desired language.
 * @param {Object} locales - The locales object containing translations for different languages and namespaces.
 * @returns {Object} - The i18next instance.
 */
export const i18nextInstance = (language: string, locales: object): i18n => {
  if (!globalI18nextInstance) {
    globalI18nextInstance = createI18nextInstance(locales, language);

    return globalI18nextInstance;
  } else {
    globalI18nextInstance.changeLanguage(language);

    return globalI18nextInstance;
  }
};

// Prevent rerender
let loaded = false;

/**
 * A React component that provides i18n functionality to the child components.
 * @param {Object} props - The props object containing the i18n options and child components.
 * @returns {JSX.Element|null} - The child components wrapped in the i18n provider, or null if hydration is not allowed.
 */
export const I18nProvider = (props: any) => {
  const [hydration, setHydration] = useState(false);

  const options: any = { ...config, ...props.i18n };

  if (!props.i18n?.locales) {
    throw new Error('locales object was not passed into I18nProvider');
  }

  const router = useRouter();
  const { asPath, query } = router;

  // Detect the current language
  const slug = asPath.split('/')[1];
  const langSlug = config.languages.includes(slug) && slug;
  const language = (
    query.lang ||
    langSlug ||
    config.defaultLanguage
  ).toString();

  // Load only once, otherwise there will be an re-render infinite loop
  if (!loaded) {
    i18nextInstance(language, props.i18n.locales);
  }

  const { i18n } = useTranslation();

  useEffect(() => {
    // Overwrite the current store
    i18n.services.resourceStore.data = props.i18n.locales;

    // Required to display the updated translations
    i18n.changeLanguage(language);
  }, [i18n, language, props.i18n.locales]);

  useEffect(() => {
    loaded = true;
    i18n.changeLanguage(language);
  }, [i18n, language]);

  useEffect(() => {
    const hasWindow = typeof window !== 'undefined';
    if (hasWindow && options.allowHydration) {
      setHydration(true);
    }
  }, [options.allowHydration]);

  return hydration ? props.children : <HeadComponent title=''/>;
  //  
};

/**
 * Retrieves all language slugs for use in Next.js dynamic routing.
 * @returns {Object[]} - An array of objects, each containing the "params" property with the "lang" parameter for each language.
 */
export function getAllLanguageSlugs() {
  return config.languages.map((lang: string) => {
    return { params: { lang: lang } };
  });
}

/**
 * Retrieves the valid language code based on the provided language.
 * If the provided language is not valid, returns the default language.
 * @param {string} lang - The language code to check for validity.
 * @returns {string} - The valid language code.
 */
export function getLanguage(lang: string) {
  return config.languages.includes(lang) ? lang : config.defaultLanguage;
}

/**
 * Detects the user's preferred language based on cookies and browser settings.
 * If a preferred language is found, redirects the user to the corresponding language page.
 */
export const languageDetection = () => {
  const router = useRouter();

  useEffect(() => {
    let browserLocale: string | undefined =
      (navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.language) || undefined;

    if (browserLocale) {
      browserLocale = browserLocale.slice(0, 2);
    }

    if (browserLocale && languages.includes(browserLocale)) {
      router.push('/' + browserLocale);
    } else {
      router.push('/' + defaultLanguage);
    }
  }, [router, defaultLanguage]);

  return null;
};
