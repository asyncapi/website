import '../styles/globals.css';

import type { AppProps } from 'next/app';
import React from 'react';

import ScrollButton from '@/components/buttons/ScrollButton';
import Banner from '@/components/campaigns/Banner';
import Footer from '@/components/footer/Footer';
import Layout from '@/components/layout/Layout';
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
    <AppContext.Provider value={{ path: router.asPath }}>
      <I18nProvider i18n={i18n}>
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
      </I18nProvider>
    </AppContext.Provider>
  );
}

export default MyApp;
