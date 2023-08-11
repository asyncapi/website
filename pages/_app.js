import Head from 'next/head';
import Layout from '../components/layout/Layout'
import Banner from '../components/campaigns/Banner'
import AppContext from '../context/AppContext'
import Footer from '../components/footer/Footer'
import { MDXProvider } from '../components/MDX';
import AlgoliaSearch from '../components/AlgoliaSearch';
import ScrollButton from '../components/buttons/ScrollButton';
import {
  I18nProvider,
  languages,
  defaultLanguage,
  namespaces,
  defaultNamespace,
} from "../lib/i18n";
import loadLocales from "../lib/locales";
import '../styles/globals.css'

function App({ Component, pageProps, router }) {

  const i18n = {
    languages,
    defaultLanguage,
    namespaces,
    defaultNamespace,
    locales: loadLocales(),
  };

  return (
    <I18nProvider i18n={i18n} /* Pass the i18n options to the i18n provider */>
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
                <ScrollButton />
              </Layout>
              <div className="mt-auto">
                <Footer />
              </div>
            </div>
          </AlgoliaSearch>
        </MDXProvider>
      </AppContext.Provider>
    </I18nProvider>
  )
}

export default App;