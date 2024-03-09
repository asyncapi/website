// pages/_app.ts
import '../styles/globals.css';

import type { AppProps } from 'next/app';

import {   defaultLanguage,
  defaultNamespace,
  I18nProvider,
  languages,
  namespaces
} from '@/utils/i18n';

import loadLocales from '../utils/locales';

/**
 * @description The MyApp component is the root component for the application.
 */
function MyApp({ Component, pageProps }: AppProps) {
  const i18n = {
    languages,
    defaultLanguage,
    namespaces,
    defaultNamespace,
    locales: loadLocales()
  };

  return (
    <I18nProvider i18n={i18n}>
      <Component {...pageProps} />
    </I18nProvider>
  );
}

export default MyApp;
