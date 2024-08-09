import { useTranslation } from 'next-i18next';

interface I18nPaths {
  [key: string]: string[];
}

export const i18nPaths: I18nPaths = {
  en: [
    '', // Homepage Route
    '/tools/cli'
  ],
  de: [
    '', // Homepage Route
    '/tools/cli'
  ]
};

export const languages = ['en', 'de'];
export const defaultLanguage = 'en';

export { useTranslation };
