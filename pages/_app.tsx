import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import React, { useEffect } from 'react';

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
  // Handle skip link visibility on first tab press
  useEffect(() => {
    let keyboardNavigation = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && !keyboardNavigation) {
        keyboardNavigation = true;
        const skipLink = document.querySelector('.skip-to-main-content-link');

        if (skipLink) {
          (skipLink as HTMLElement).style.top = '0';
        }
      }
    };

    const handleClick = () => {
      if (keyboardNavigation) {
        keyboardNavigation = false;
        const skipLink = document.querySelector('.skip-to-main-content-link');

        if (skipLink) {
          (skipLink as HTMLElement).style.top = '-40px';
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <AppContext.Provider value={{ path: router.asPath }}>
      {/* <MDXProvider components={mdxComponents}> */}
      <Head>
        <script async defer src='https://buttons.github.io/buttons.js'></script>
      </Head>
      {/* Skip to main content link for accessibility - placed before header */}
      <a href='#main-content' className='skip-to-main-content-link'>
        Skip to main content
      </a>
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
      {/* </MDXProvider> */}
    </AppContext.Provider>
  );
}

export default appWithTranslation(MyApp);
