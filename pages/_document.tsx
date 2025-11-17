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
        
          <link rel="preload" as="image" href="/img/homepage/lukasz-homepage-slack.webp" />
          <link rel="preload" as="image" href="/img/homepage/eve-and-chan.webp" />

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
