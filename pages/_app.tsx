import '../styles/globals.css';

import { MDXProvider } from '@mdx-js/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import Layout from '@/components/layout/Layout';
import AppContext from '@/context/AppContext';

/**
 * @description The MyApp component is the root component for the application.
 */
function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AppContext.Provider value={{ path: router.asPath }}>
      <Head>
        <script async defer src='https://buttons.github.io/buttons.js'></script>
      </Head>
      <MDXProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MDXProvider>
    </AppContext.Provider>
  );
}

export default MyApp;
