import Head from 'next/head';
import Layout from '../components/layout/Layout'
import Banner from '../components/campaigns/Banner'
import AppContext from '../context/AppContext'
import Footer from "../components/Footer";
import MDXProvider from '../components/MDX';
import AlgoliaSearch from '../components/AlgoliaSearch';

import '../styles/globals.css'

export default function App({ Component, pageProps, router }) {
  return (
    <AppContext.Provider value={{ path: router.asPath }}>
      <Head>
        <script async defer src="https://buttons.github.io/buttons.js"></script>
      </Head>
      <MDXProvider>
        <AlgoliaSearch>
          <div className="flex flex-col min-h-screen">
            <Banner />
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <div className="mt-auto">
              <Footer />
            </div>
          </div>
        </AlgoliaSearch>
      </MDXProvider>
    </AppContext.Provider>
  )
}
