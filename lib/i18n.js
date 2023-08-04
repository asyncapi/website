import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import i18next from "i18next";
import {
  initReactI18next,
  useTranslation,
  withTranslation,
  Translation,
  Trans
} from "react-i18next";
import nextI18nextStaticSiteConfig from "../next-i18next-static-site.config";
var defaultConfig = {
  allowHydration: true,
  languages: ["en"],
  defaultLanguage: "en",
  namespaces: ["common"],
  defaultNamespace: "common",
  cookieName: "lang",
  cookieOptions: { expires: 365, path: "/" }
};
var config = {
  ...defaultConfig,
  languages: nextI18nextStaticSiteConfig.i18n.languages,
  defaultLanguage: nextI18nextStaticSiteConfig.i18n.defaultLanguage,
  namespaces: nextI18nextStaticSiteConfig.i18n.namespaces,
  defaultNamespace: nextI18nextStaticSiteConfig.i18n.defaultNamespace
};
var languages = config.languages;
var defaultLanguage = config.defaultLanguage;
var namespaces = config.namespaces;
var defaultNamespace = config.defaultNamespace;
var defaultNamespace2 = config.defaultNamespace;
var cookieName = config.cookieName;
var createI18nextInstance = (locales, language) => {
  const plugins = [
    initReactI18next
  ];
  const i18nInstance = i18next;
  plugins.map((plugin) => i18nInstance.use(plugin));
  i18nInstance.init({
    resources: locales,
    cleanCode: true,
    lng: language,
    supportedLngs: config.languages,
    fallbackLng: language ? language : config.defaultLanguage,
    ns: config.namespaces,
    defaultNS: config.defaultNamespace,
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    },
    load: "languageOnly"
  });
  return i18nInstance;
};
var globalI18nextInstance = null;
var i18nextInstance = (language, locales) => {
  if (!globalI18nextInstance) {
    globalI18nextInstance = createI18nextInstance(locales, language);
    return globalI18nextInstance;
  } else {
    globalI18nextInstance.changeLanguage(language);
    return globalI18nextInstance;
  }
};
var loaded = false;
var I18nProvider = (props) => {
  var _a;
  const [hydration, setHydration] = useState(false);
  const options = { ...config, ...props.i18n };
  if (!((_a = props.i18n) == null ? void 0 : _a.locales)) {
    throw new Error("locales object was not passed into I18nProvider");
  }
  const router = useRouter();
  const { asPath, query } = router;
  const slug = asPath.split("/")[1];
  const langSlug = config.languages.includes(slug) && slug;
  const language = (query.lang || langSlug || config.defaultLanguage).toString();
  const pathLocale = (query.lang || langSlug).toString();
  if (pathLocale && pathLocale !== "false") {
    Cookies.set(config.cookieName, pathLocale, config.cookieOptions);
  }
  if (!loaded) {
    i18nextInstance(language, props.i18n.locales);
  }
  const { i18n: i18n2 } = useTranslation();
  useEffect(() => {
    i18n2.services.resourceStore.data = props.i18n.locales;
    i18n2.changeLanguage(language);
  }, [i18n2, language, props.i18n.locales]);
  useEffect(() => {
    loaded = true;
    i18n2.changeLanguage(language);
  }, [i18n2, language]);
  useEffect(() => {
    const hasWindow = typeof window !== "undefined";
    if (hasWindow && options.allowHydration) {
      setHydration(true);
    }
  }, [options.allowHydration]);
  return hydration ? props.children : null;
};
function getAllLanguageSlugs() {
  return config.languages.map((lang) => {
    return { params: { lang } };
  });
}
function getLanguage(lang) {
  return config.languages.includes(lang) ? lang : config.defaultLanguage;
}
var languageDetection = () => {
  const router = useRouter();
  useEffect(() => {
    let cookieLocale = Cookies.get(cookieName) || void 0;
    let browserLocale = (navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language) || void 0;
    if (browserLocale) {
      browserLocale = browserLocale.slice(0, 2);
    }
    if (cookieLocale && languages.includes(cookieLocale)) {
      router.push("/" + cookieLocale);
    } else if (browserLocale && languages.includes(browserLocale)) {
      router.push("/" + browserLocale);
    } else {
      router.push("/" + defaultLanguage);
    }
  }, [router, defaultLanguage]);
  return null;
};
export {
  I18nProvider,
  Trans,
  Translation,
  cookieName,
  defaultLanguage,
  defaultNamespace,
  defaultNamespace2,
  getAllLanguageSlugs,
  getLanguage,
  i18nextInstance,
  languageDetection,
  languages,
  namespaces,
  useTranslation,
  withTranslation
};
