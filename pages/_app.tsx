import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import React, { useEffect } from 'react';

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
  // Handle skip link focus management
  useEffect(() => {
    const handleSkipLinkFocus = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const skipLink = document.querySelector('.skip-to-main-content-link') as HTMLElement;
        if (skipLink) {
          skipLink.style.left = '0';
        }
      }
    };

    document.addEventListener('keydown', handleSkipLinkFocus);
    return () => {
      document.removeEventListener('keydown', handleSkipLinkFocus);
    };
  }, []);

  // Handle hash-based navigation for skip link
  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash;
      if (hash === '#main-content') {
        const element = document.getElementById('main-content');
        if (element) {
          element.focus();
        }
      }
    };

    handleRouteChange(); // Check on initial load
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  // Improved skip link visibility handling
  useEffect(() => {
    const showSkipLink = () => {
      const skipLink = document.querySelector('.skip-to-main-content-link') as HTMLElement;
      if (skipLink) {
        skipLink.style.left = '0';
      }
    };

    const hideSkipLink = () => {
      const skipLink = document.querySelector('.skip-to-main-content-link') as HTMLElement;
      if (skipLink) {
        // Only hide if not focused
        if (document.activeElement !== skipLink) {
          skipLink.style.left = '-999px';
        }
      }
    };

    // Show skip link on first tab
    let tabPressed = false;
    const handleFirstTab = (e: KeyboardEvent) => {
      if (!tabPressed && e.key === 'Tab') {
        tabPressed = true;
        showSkipLink();
      }
    };

    // Hide skip link when clicking elsewhere
    const handleClick = () => {
      setTimeout(hideSkipLink, 100);
    };

    window.addEventListener('keydown', handleFirstTab);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleFirstTab);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <AppContext.Provider value={{ path: router.asPath }}>
      {/* <MDXProvider components={mdxComponents}> */}
      <Head>
        <script async defer src='https://buttons.github.io/buttons.js'></script>
      </Head>
      <AlgoliaSearch>
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content" 
          className="skip-to-main-content-link"
        >
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
      </AlgoliaSearch>
      {/* </MDXProvider> */}
    </AppContext.Provider>
  );
}

export default appWithTranslation(MyApp);