import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { defaultLanguage, i18nPaths, languages } from '@/utils/i18n';

interface LinkComponentProps {
  children: React.ReactNode;
  locale?: string;
  href?: string;
  legacyBehavior?: boolean;
  target?: string;
  rel?: string;
}

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

  // If there is no router available (e.g., during server-side rendering & cypress tests), render a standard Link
  if (!router) {
    return (
      <Link href={props.href || ''} legacyBehavior={legacyBehavior} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  const { pathname, query, asPath } = router;

  // Detect current language based on the path or query parameter
  const slug = asPath.split('/')[1];
  const langSlug = languages.includes(slug) && slug;
  const language: string = query.lang && typeof query.lang === 'string' ? query.lang : langSlug || defaultLanguage; // Ensure language is always a string

  let href = props.href || pathname;

  /*
    If explicit href is provided, and the language-specific paths for the current language do not include the href,
    or if the href starts with "http", render a standard Link
  */
  if ((props.href && i18nPaths[language] && !i18nPaths[language].includes(href)) || href.includes('http', 0)) {
    return (
      <Link href={href} legacyBehavior={legacyBehavior} passHref target={target} rel={rel}>
        {children}
      </Link>
    );
  }
  // If a locale is provided, update the href with the locale
  if (locale) {
    if (props.href) {
      href = `/${locale}${href}`;
    } else {
      // If the current path starts with "/404", update href to be the root path with the locale
      // Otherwise, replace "[lang]" placeholder with the locale
      href = pathname.startsWith('/404') ? `/${locale}` : pathname.replace('[lang]', locale);
    }
  } else {
    // If no locale is provided, update the href with the current language or keep it as is
    href = language ? `/${language}${href}` : `/${href}`;
  }

  // Fix double slashes
  href = href.replace(/([^:/]|^)\/{2,}/g, '$1/');

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
