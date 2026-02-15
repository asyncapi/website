import React, { useEffect, useRef, useState } from 'react';
import i18nextConfig from '@/next-i18next.config.cjs';

import IconLanguage from '../icons/Language';
import NavItemDropdown from '../icons/NavItemDropdown';

interface LanguageSelectProps {
  uniqueLangs: { key: string; text: string; value: string }[];
  currentLanguage: string;
  changeLanguage: (locale: string, langPicker: boolean) => void;
}

export default function LanguageSelect({
  uniqueLangs,
  currentLanguage,
  changeLanguage
}: LanguageSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { langMap } = i18nextConfig;

  const currentLangLabel =
    langMap[currentLanguage.toLowerCase() as keyof typeof langMap] ||
    currentLanguage;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative inline-block">

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-x-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50"
      >
        <IconLanguage className="h-4 w-4 text-gray-800" />
        <span>{currentLangLabel}</span>
        <NavItemDropdown />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg bg-white px-3 py-3 shadow-lg">
          {uniqueLangs.map((lang) => {
            const isActive =
              currentLanguage.toLowerCase() === lang.text.toLowerCase();

            return (
              <button
                key={lang.key}
                onClick={() => {
                  changeLanguage(lang.value.toLowerCase(), true);
                  setOpen(false);
                }}
                className={`block w-full rounded-lg py-1 px-2 text-start text-sm font-medium leading-6 transition duration-150 ease-in-out hover:bg-gray-50 ${
                  isActive ? 'text-secondary-500' : 'text-gray-700'
                }`}
              >
                {langMap[lang.text.toLowerCase() as keyof typeof langMap] ||
                  lang.text}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
