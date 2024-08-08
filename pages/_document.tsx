import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          {/* Icons */}
          <link rel='icon' href='/favicon.ico' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='194x194' href='/favicon-194x194.png' />

          <Script src='https://buttons.github.io/buttons.js' strategy='afterInteractive' />
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
