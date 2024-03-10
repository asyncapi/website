import '../styles/globals.css';

import { MDXProvider } from '@mdx-js/react';
import type { AppProps } from 'next/app';

import Layout from '@/components/layout/Layout';
import AppContext from '@/context/AppContext';
import {
  defaultLanguage,
  defaultNamespace,
  I18nProvider,
  languages,
  namespaces
} from '@/utils/i18n';

import loadLocales from '../utils/locales';

/**
 * @description The MyApp component is the root component for the application.
 */
function MyApp({ Component, pageProps, router }: AppProps) {
  const i18n = {
    languages,
    defaultLanguage,
    namespaces,
    defaultNamespace,
    locales: loadLocales()
  };

  return (
    <AppContext.Provider value={{ path: router.asPath }}>
      <I18nProvider i18n={i18n}>
        <MDXProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MDXProvider>
      </I18nProvider>
    </AppContext.Provider>
  );
}

export default MyApp;
