import { useState, useEffect } from "react"
import { useRouter } from "next/router";
import { isMobileDevice } from '../helpers/is-mobile'
import { useOutsideClick } from '../helpers/use-outside-click';
import AsyncAPILogo from '../AsyncAPILogo'
import NavItem from './NavItem'
import ToolsPanel from './ToolsPanel'
import LearningPanel from './LearningPanel'
import CommunityPanel from "./CommunityPanel"
import MobileNavMenu from './MobileNavMenu'
import otherItems from './otherItems'

import GithubButton from "../buttons/GithubButton"
import { SearchButton } from '../AlgoliaSearch';
import IconLoupe from '../icons/Loupe';
import Link from 'next/link';
import LanguageSelect from '../languageSelector/LanguageSelect';
import {
  defaultLanguage,
  languages,
  useTranslation,
} from "../../lib/i18n";
import browserLanguageDetector from "../../lib/browserLanguageDetector";

const isMobile = isMobileDevice();
const uniqueLangs = [...new Set(["EN", "DE"])].map((repo) => ({
  key: repo,
  text: repo,
}));

export default function NavBar({
  className = '',
  hideLogo = false,
}) {
  const router = useRouter();
  const { pathname, query, asPath } = router;
  const [open, setOpen] = useState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState();
  const { i18n } = useTranslation();

  const changeLanguage = async (locale, langPicker) => {

    // Verifies if the language change is from langPicker or the browser-api
    if(langPicker){
      localStorage.setItem('i18nLang', locale);
    }

    // Detect current language
    const slug = asPath.split("/")[1];
    const langSlug = languages.includes(slug) && slug;
    const language = query.lang || langSlug || defaultLanguage;

    let href = pathname;

    if (locale) {
      if (pathname.startsWith("/404")) {
        href = `/${locale}`;
      } else {
        href = pathname.replace("[lang]", locale);
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

    router.push(href);
  };

  // To be enabled on the last PR
  // useEffect(() => {
  //   changeLanguage(browserLanguageDetector(), false);
  // }, []);

  function outsideClick(menu) {
    if (open !== menu) return;
    setOpen(null);
  }

  const learningRef = useOutsideClick(() => outsideClick('learning'));
  const toolingRef = useOutsideClick(() => outsideClick('tooling'));
  const communityRef = useOutsideClick(() => outsideClick('community'));

  function showMenu(menu) {
    if (open === menu) return;
    setOpen(menu);
  }

  function showOnClickMenu(menu) {
    if (!isMobile) return;
    if (open === menu) return setOpen(null);
    setOpen(menu);
  }

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpen(null);
  }, [asPath])

  return (
    <div className={`bg-white ${className} z-50`}>
      <a href="#main-content" className="block md:inline-block absolute transform -translate-y-20 focus:translate-y-0 bg-gray-100 text-gray-700 p-5 text-md font-semibold" alt="Skip to main content">Skip to main content</a>
      <div className="flex w-full justify-between items-center py-6 lg:justify-start lg:space-x-10 whitespace-nowrap">
        {!hideLogo && (
          <div className="lg:w-auto lg:flex-1">
            <div className="flex" >
              <Link href="/">
                <a className="cursor-pointer" aria-label="AsyncAPI" data-testid="Navbar-logo">
                  <AsyncAPILogo className="h-8 w-auto sm:h-8" />
                </a>
              </Link>
            </div>
          </div>
        )}



        <nav className="hidden lg:flex lg:items-center lg:justify-end space-x-6 xl:space-x-10 w-full" data-testid="Navbar-main">


          <div className="flex flex-row items-center justify-content">



            <GithubButton text="Star on GitHub" href="https://github.com/asyncapi/spec" className="py-2 ml-2" inNav="true" />
          </div>
        </nav>

      </div>

      {/* Mobile menu, show/hide based on mobile menu state. */}
      {mobileMenuOpen && <MobileNavMenu onClickClose={() => setMobileMenuOpen(false)} />}

    </div>
  )
}
