import { useRouter } from 'next/router';
import { useEffect } from 'react';

import languageDetector from './languageDetector';

/**
 * Redirects the user to a language-specific URL.
 *
 * This hook detects the user's language and navigates to a URL prefixed with the detected language code.
 * If the `to` parameter is not provided, the current URL is used. It also prevents infinite redirection loops
 * by handling cases where the route is a 404 page.
 *
 * @param to - The URL to redirect to; if undefined, the current URL is used.
 * @returns null
 */
export function useRedirect(to: string | undefined): any {
  const router = useRouter();

  const toUrl = to || router.asPath;

  // language detection
  useEffect(() => {
    const detectedLng = languageDetector.detect();

    if (toUrl.startsWith(`/${detectedLng}`) && router.route === '/404') {
      // prevent endless loop
      router.replace(`/${detectedLng}${router.route}`);

      return;
    }

    languageDetector.cache!(detectedLng!);
    router.replace(`/${detectedLng}${toUrl}`);
  });

  return null;
}

/**
 * Component that redirects the user to the current URL with a language prefix.
 * @returns null
 */
export const Redirect = () => {
  useRedirect(undefined);

  return null;
};

/**
 * Higher-order function that returns a component that redirects the user to a specified URL with a language prefix.
 * @param to - The URL to redirect to.
 * @returns A component that redirects the user to the specified URL.
 */
export const getRedirect = (to: string) => () => {
  useRedirect(to);

  return null;
};
