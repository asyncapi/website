import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

import i18nextConfig from '../next-i18next.config.cjs';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    // eslint-disable-next-line no-underscore-dangle
    const currentLocale = this.props.__NEXT_DATA__.query.locale || i18nextConfig.i18n.defaultLocale;

    return (
      <Html lang={currentLocale as string}>
        <Head>
          {/* Load Work Sans font */}
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
          {/* eslint-disable-next-line max-len */}
          <link
            href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Work+Sans:wght@200;300;400;500;600;700;800;900&display=swap'
            rel='stylesheet'
          />

          {/* Icons */}
          <link rel='icon' href='/favicon.ico' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='194x194' href='/favicon-194x194.png' />

          <script async defer src='https://buttons.github.io/buttons.js'></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
