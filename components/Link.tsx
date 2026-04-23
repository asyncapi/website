import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { defaultLanguage, i18nPaths, languages } from '@/utils/i18n';

type LinkComponentProps = Readonly<{
  children: React.ReactNode;
  locale?: string;
  href?: string;
  legacyBehavior?: boolean;
  target?: string;
  rel?: string;
}>;

/**
 * @description Custom Link component for handling internationalization (i18n).
 * @param {Object} props - Props for the Link component.
 * @param {React.ReactNode} props.children - The content to render within the Link.
 * @param {string} [props.locale] - The locale for the link.
 * @param {string} [props.href] - The URL the link points to.
 * @param {boolean} [props.legacyBehavior=false] - Whether to use the legacy behavior for the link.
 */
export default function LinkComponent({
  children,
  locale,
  legacyBehavior = false,
  target = '_self',
  rel = '',
  ...props
}: LinkComponentProps) {
  const router = useRouter();

  // Render plain Link if no router (SSR / tests)
  if (!router) {
    return (
      <Link href={props.href || ''} legacyBehavior={legacyBehavior} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  const { pathname, query, asPath } = router;

  const pathSlug = asPath.split('/')[1];
  const langFromPath = languages.includes(pathSlug) ? pathSlug : undefined;
  const language = typeof query.lang === 'string' ? query.lang : langFromPath || defaultLanguage;

  const originalHref = props.href ?? pathname;
  const isExternal = originalHref.startsWith('http');
  const hasI18n = Boolean(i18nPaths[language]);
  const hrefInI18n = hasI18n && i18nPaths[language].includes(originalHref);

  // External links or links not present in i18n map -> simple Link
  if (isExternal || (props.href && !hrefInI18n)) {
    return (
      <Link href={originalHref} legacyBehavior={legacyBehavior} passHref target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  // Build localized href
  const buildLocalizedHref = (): string => {
    if (locale) {
      if (props.href) return `/${locale}${originalHref}`;

      return pathname.startsWith('/404') ? `/${locale}` : pathname.replace('[lang]', locale);
    }

    // No explicit locale: prefer resolved language; keep leading slash consistent
    const langPrefix = language ? `/${language}` : '/';

    return `${langPrefix}${originalHref}`.replaceAll(/\/{2,}/g, '/');
  };

  let href = buildLocalizedHref();

  // Fix double slashes (ensure protocol slashes preserved)
  href = href.replaceAll(/([^:/]|^)\/{2,}/g, '$1/');

  return (
    <Link href={href} legacyBehavior={legacyBehavior} target={target} rel={rel} passHref>
      {children}
    </Link>
  );
}

export const LinkText = ({
  href,
  children,
  legacyBehavior = false,
  target = '_self',
  rel = ''
}: LinkComponentProps) => {
  return (
    <Link href={href || ''} target={target} rel={rel} legacyBehavior={legacyBehavior}>
      {children}
    </Link>
  );
};
