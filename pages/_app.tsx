import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Script from 'next/script';
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
  const isProduction =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'asyncapi.com' ||
      window.location.hostname.endsWith('.asyncapi.com'));

  return (
    <AppContext.Provider value={{ path: router.asPath }}>
      {/* <MDXProvider components={mdxComponents}> */}
      {isProduction && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-T58BTVQ');`,
          }}
        />
      )}
      <AlgoliaSearch>
        <div className="flex min-h-screen flex-col">
          <Banner />
          <StickyNavbar>
            <NavBar className="mx-auto block max-w-screen-xl px-4 sm:px-6 lg:px-8" />
          </StickyNavbar>

          <Layout>
            <Component {...pageProps} />
            <ScrollButton />
          </Layout>

          <div className="mt-auto dark:bg-dark-background">
            <Footer />
          </div>
        </div>
      </AlgoliaSearch>
      {/* </MDXProvider> */}
    </AppContext.Provider>
  );
}

export default appWithTranslation(MyApp);
