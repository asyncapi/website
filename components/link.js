import Link from "next/link";
import { useRouter } from "next/router";
import { defaultLanguage, languages } from "../lib/i18n";
import i18nPaths from "../lib/i18nPaths";

const LinkComponent = ({ children, locale, ...props }) => {
  const router = useRouter();

  if (!router) {
    return (
      <Link href={props.href} passHref>
        {children}
      </Link>
    );
  }

  const { pathname, query, asPath } = router;

  // Detect current language
  const slug = asPath.split("/")[1];
  const langSlug = languages.includes(slug) && slug;
  const language = query.lang || langSlug || defaultLanguage;

  let href = props.href || pathname;

  if ((props.href && i18nPaths[language] && !i18nPaths[language].includes(href)) || href.startsWith("http")) {
    return (
      <Link href={href} passHref>
        {children}
      </Link>
    );
  }

  if (locale) {
    if (props.href) {
      href = `/${locale}${href}`;
    } else {
      if (pathname.startsWith("/404")) {
        href = `/${locale}`;
      } else {
        href = pathname.replace("[lang]", locale);
      }
    }
  } else {
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