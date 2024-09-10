import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import React from 'react';

import AlgoliaSearch from '@/components/AlgoliaSearch';
import ScrollButton from '@/components/buttons/ScrollButton';
import Banner from '@/components/campaigns/Banner';
import Footer from '@/components/footer/Footer';
import Layout from '@/components/layout/Layout';
import NavBar from '@/components/navigation/NavBar';
import StickyNavbar from '@/components/navigation/StickyNavbar';
import AppContext from '@/context/AppContext';

/**
 * @description The MyApp component is the root component for the application.
 */
function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AppContext.Provider value={{ path: router.asPath }}>
      {/* <MDXProvider components={mdxComponents}> */}
      <Head>
        <script async defer src='https://buttons.github.io/buttons.js'></script>
      </Head>
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
      {/* </MDXProvider> */}
    </AppContext.Provider>
  );
}

export default appWithTranslation(MyApp);
