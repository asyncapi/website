import AppContext from "../../context/AppContext";
import { MDXProvider } from "../../components/MDX";
import Layout from "../../components/layout/Layout";
import AlgoliaSearch from "../../components/AlgoliaSearch";
import { createRouter } from "./router";
import MockRouter from "./router";

import Head from "next/head";

export default function MockApp({ children }) {
  return (
    <AppContext.Provider value={{ path: createRouter.asPath }}>
      <Head>
        <script async defer src="https://buttons.github.io/buttons.js"></script>
      </Head>
      <MDXProvider>
        <AlgoliaSearch>
          <div className="flex flex-col min-h-screen">
            <MockRouter pathname="/">
              <Layout>  {children} </Layout>
            </MockRouter>
          </div>
        </AlgoliaSearch>
      </MDXProvider>
    </AppContext.Provider>
  )
}