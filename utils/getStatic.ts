import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import i18nextConfig from '../next-i18next.config.cjs';

/**
 * Retrieves the internationalization paths for the supported locales.
 * @returns An array of paths for each supported locale.
 */
export const getI18nPaths = () =>
  i18nextConfig.i18n.locales.map((lng) => ({
    params: {
      lang: lng
    }
  }));

/**
 * Retrieves the static paths for Next.js.
 * @returns An object containing the fallback value and an array of paths.
 */
export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths()
});

/**
 * Retrieves the internationalization props for a given context and namespaces.
 * @param ctx - The context object containing the locale parameter.
 * @param ns - An array of namespaces to be loaded.
 * @returns An object containing the internationalization props.
 */
export async function getI18nProps(ctx: any, ns = ['common']) {
  const locale = ctx?.params?.lang ? ctx.params.lang : 'en';
  const props = {
    ...(await serverSideTranslations(locale, ns))
  };

  return props;
}

/**
 * Creates static props for Next.js based on the given namespaces.
 * @param ns - An object containing the namespaces to be loaded.
 * @returns A function that retrieves the static props.
 */
export function makeStaticProps(ns = {}) {
  return async function getStaticProps(ctx: any) {
    return {
      props: await getI18nProps(ctx, ns as any)
    };
  };
}
