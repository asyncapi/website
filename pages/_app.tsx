import '../styles/globals.css';

import type { AppProps } from 'next/app';

/**
 * @description The MyApp component is the root component for the application.
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
