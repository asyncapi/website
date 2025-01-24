import { useTranslation } from 'next-i18next';

interface I18nPaths {
  [key: string]: string[];
}

export const i18nPaths: I18nPaths = {
  english: [
    '', // Homepage Route
    '/tools/cli',
    '/newsletter'
  ],
  deutsch: [
    '', // Homepage Route
    '/tools/cli',
    '/newsletter'
  ]
};

export const languages = ['english', 'deutsch'];
export const defaultLanguage = 'english';

export { useTranslation };
