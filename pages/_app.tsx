import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import React from 'react';

import AlgoliaSearch from '@/components/AlgoliaSearch';
import ScrollButton from '@/components/buttons/ScrollButton';
import Banner from '@/components/campaigns/Banner';
import Footer from '@/components/footer/Footer';
import Layout from '@/components/layout/Layout';
import { MDXProvider } from '@/components/MDX/MDX';
import NavBar from '@/components/navigation/NavBar';
import StickyNavbar from '@/components/navigation/StickyNavbar';
import AppContext from '@/context/AppContext';
import { defaultLanguage, defaultNamespace, I18nProvider, languages, namespaces } from '@/utils/i18n';
import loadLocales from '@/utils/locales';

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
    <I18nProvider i18n={i18n}>
      {/* remove default theme after dark mode is completed */}
      <ThemeProvider attribute='class' defaultTheme="light">
        <AppContext.Provider value={{ path: router.asPath }}>
          <Head>
            <script async defer src='https://buttons.github.io/buttons.js'></script>
          </Head>
          <MDXProvider>
            <AlgoliaSearch>
              <div className='flex min-h-screen flex-col'>
                <Banner />
                <StickyNavbar>
                  <NavBar className='mx-auto block max-w-screen-xl px-4 sm:px-6 lg:px-8' />
                </StickyNavbar>
                <Layout>
                  <Component {...pageProps} />
                  <ScrollButton />
                </Layout>
                <div className='mt-auto'>
                  <Footer />
                </div>
              </div>
            </AlgoliaSearch>
          </MDXProvider>
        </AppContext.Provider>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default MyApp;
