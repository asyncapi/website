import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import AlgoliaSearch from '@/components/AlgoliaSearch';
import ScrollButton from '@/components/buttons/ScrollButton';
import DarkModeToggle from '@/components/buttons/DarkModeToggle';
import Banner from '@/components/campaigns/Banner';
import Footer from '@/components/footer/Footer';
import Layout from '@/components/layout/Layout';
import NavBar from '@/components/navigation/NavBar';
import StickyNavbar from '@/components/navigation/StickyNavbar';
import AppContext from '@/context/AppContext';

function MyApp({ Component, pageProps, router }: AppProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <AppContext.Provider value={{ path: router.asPath }}>
      <Head>
        <script async defer src='https://buttons.github.io/buttons.js'></script>
      </Head>
      <AlgoliaSearch>
        <div className={`flex min-h-screen flex-col bg-white text-black dark:bg-black dark:text-white`}>
          <Banner />
          <StickyNavbar>
            <div className='mx-auto flex max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8'>
              <NavBar />
              <DarkModeToggle />
            </div>
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
    </AppContext.Provider>
  );
}

export default appWithTranslation(MyApp);
