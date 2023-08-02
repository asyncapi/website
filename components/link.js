import Link from "next/link";
import { useRouter } from "next/router";
import { defaultLanguage, languages } from "next-i18next-static-site";

const LinkComponent = ({ children, locale, ...props }) => {
  const router = useRouter();
  const { pathname, query, asPath } = router;

  // Detect current language
  const slug = asPath.split("/")[1];
  const langSlug = languages.includes(slug) && slug;
  const language = query.lang || langSlug || defaultLanguage;

  let href = props.href || pathname;

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