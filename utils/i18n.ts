import { useTranslation } from 'next-i18next';

interface I18nPaths {
  [key: string]: string[];
}

export const i18nPaths: I18nPaths = {
  en: [
    '', // Homepage Route
    '/tools/cli',
    '/newsletter'
  ],
  de: [
    '', // Homepage Route
    '/tools/cli',
    '/newsletter'
  ],
  zh_cn: [
    '', // Homepage Route
    '/tools/cli',
    '/newsletter'
  ]
};

export const languages = ['en', 'de', 'zh_cn'];
export const defaultLanguage = 'en';

export { useTranslation };
