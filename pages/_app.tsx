import '../styles/globals.css';

import type { AppProps } from 'next/app';
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
import { firaCode, firaMono, inter, workSans } from '@/utils/font';
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
    <div className={`${inter.variable} ${workSans.variable} ${firaCode.variable} ${firaMono.variable}`}>
      <I18nProvider i18n={i18n}>
        <AppContext.Provider value={{ path: router.asPath }}>
          <MDXProvider>
            <AlgoliaSearch>
              <div className={'flex min-h-screen flex-col font-sans'}>
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
      </I18nProvider>
    </div>
  );
}

export default MyApp;
