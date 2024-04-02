import Link from "next/link";
import { useRouter } from "next/router";
import { defaultLanguage, languages } from "../lib/i18n";
import i18nPaths from "../lib/i18nPaths";

const LinkComponent = ({ children, locale, ...props }) => {
  const router = useRouter();

  // If there is no router available (e.g., during server-side rendering & cypress tests), render a standard Link
  if (!router) {
    return (
      <Link href={props.href} passHref>
        {children}
      </Link>
    );
  }

  const { pathname, query, asPath } = router;

  // Detect current language based on the path or query parameter
  const slug = asPath.split("/")[1];
  const langSlug = languages.includes(slug) && slug;
  const language = query.lang || langSlug || defaultLanguage;

  let href = props.href || pathname;

  /* 
  If explicit href is provided, and the language-specific paths for the current language do not include the href, or if the href starts with "http", render a standard Link 
  */
  if ((props.href && i18nPaths[language] && !i18nPaths[language].includes(href)) || href.includes("http", 0)) {
    return (
      <Link href={href} passHref>
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
      if (pathname.startsWith("/404")) {
        href = `/${locale}`;
      } else {
        href = pathname.replace("[lang]", locale);
      }
    }
  } else {
    // If no locale is provided, update the href with the current language or keep it as is
    if (language) {
      href = `/${language}${href}`;
    } else {
      href = `/${href}`;
    }
  }

  // Fix double slashes
  href = href.replace(/([^:]\/)\/+/g, "$1").replace("//", "/");

  return (
    <Link href={href} passHref>
      {children}
    </Link>
  );
};

export const LinkText = ({ href, children, ...props }) => {
  return <Link href={href || ""}>{children}</Link>;
};

export default LinkComponent;