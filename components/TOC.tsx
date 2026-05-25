import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import ArrowRight from './icons/ArrowRight';

interface ITOCProps {
  className?: string;
  cssBreakingPoint?: string;
  toc: {
    lvl: number;
    content: string;
    slug: string;
    seen?: number;
  }[];
  contentSelector?: string;
  depth?: number;
}

/**
 * @description Track the last heading that has passed the fixed page header.
 * Keeping that heading active means long sections remain identified while reading their content.
 * @param {string[]} itemIds - The heading ids represented by the table of contents
 * @param {string} contentSelector - Optional scroll container selector
 * @param {number} topOffset - Fixed header offset in pixels
 * @returns {string | null} The active heading id
 */
function useActiveTocItem(itemIds: string[], contentSelector: string | undefined, topOffset: number) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const itemIdsKey = JSON.stringify(itemIds);

  useEffect(() => {
    const scrollContainer = contentSelector ? document.querySelector<HTMLElement>(contentSelector) : null;
    const scrollTarget = scrollContainer || globalThis;
    const headings = (JSON.parse(itemIdsKey) as string[])
      .map((itemId) => document.getElementById(itemId))
      .filter((heading): heading is HTMLElement => heading !== null);

    if (!headings.length) {
      setActiveItem(null);

      return undefined;
    }

    const updateActiveItem = () => {
      const activationLine = (scrollContainer?.getBoundingClientRect().top || 0) + topOffset;
      let nextActiveItem = headings[0].id;

      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= activationLine) {
          nextActiveItem = heading.id;
        } else {
          break;
        }
      }

      setActiveItem(nextActiveItem);
    };

    updateActiveItem();
    scrollTarget.addEventListener('scroll', updateActiveItem, { passive: true });
    globalThis.addEventListener('resize', updateActiveItem);

    return () => {
      scrollTarget.removeEventListener('scroll', updateActiveItem);
      globalThis.removeEventListener('resize', updateActiveItem);
    };
  }, [contentSelector, itemIdsKey, topOffset]);

  return activeItem;
}

/**
 * @description The table of contents
 * @param {string} props.className - The class name of the component
 * @param {string} props.cssBreakingPoint - The CSS breaking point
 * @param {Array} props.toc - The table of contents
 * @param {string} props.contentSelector - The content selector
 * @param {number} props.depth - The depth of the table of contents
 */
export default function TOC({ className, cssBreakingPoint = 'xl', toc, contentSelector, depth = 2 }: ITOCProps) {
  const [open, setOpen] = useState(false);

  const minLevel = toc?.reduce((mLevel, item) => (!mLevel || item.lvl < mLevel ? item.lvl : mLevel), 0) || 0;

  const tocItems = (toc || [])
    .filter((item) => item.lvl <= minLevel + depth)
    .map((item) => ({
      ...item,
      content: item.content.replace(/[\s]?\{#[\w\d\-_]+\}$/, '').replace(/(<([^>]+)>)/gi, ''),
      // For TOC rendering in specification files in the spec repo we have "a" tags added manually to the spec
      // markdown document MDX takes these "a" tags and uses them to render the "id" for headers like
      // a-namedefinitionsapplicationaapplication slugWithATag contains transformed heading name that is later used
      // for scroll spy identification
      slugWithATag: (() => {
        const base = item.content
          .replace(/[<>?!:`'."\\/=@#$%^&*()[\]{}+,;]/gi, '')
          .replace(/\s/gi, '-')
          .toLowerCase();

        if (typeof item.seen === 'number' && item.seen > 0) {
          return `${base}-${item.seen}`;
        }

        return base;
      })()
    }));
  const getItemId = (item: (typeof tocItems)[number]) => item.slug || item.slugWithATag;
  const activeItem = useActiveTocItem(tocItems.map(getItemId), contentSelector, 120);

  if (!toc || !toc.length) return null;

  return (
    <div
      className={twMerge(
        `${className} ${tocItems.length ? '' : 'hidden'} 
      ${cssBreakingPoint === 'xl' ? 'xl:block' : 'lg:block'} md:top-24 md:max-h-(screen-14) mb-4 z-20`
      )}
      onClick={() => setOpen(!open)}
    >
      <div
        className={`flex cursor-pointer ${tocItems.length ? '' : 'hidden'}
        ${cssBreakingPoint === 'xl' ? 'xl:cursor-auto' : 'lg:cursor-auto'} xl:mt-2`}
      >
        <h5
          className={twMerge(
            `${open && 'mb-4'} flex-1 text-primary-500 font-medium uppercase tracking-wide text-sm font-sans antialiased ${
              cssBreakingPoint === 'xl'
                ? 'xl:mb-4 xl:text-xs xl:text-gray-900 dark:xl:text-gray-300 xl:font-bold'
                : 'lg:mb-4 lg:text-xs lg:text-gray-900 dark:lg:text-gray-300 lg:font-bold'
            }`
          )}
          data-testid='TOC-Heading'
        >
          On this page
        </h5>
        <div className={`text-underline p4 text-center ${cssBreakingPoint === 'xl' ? 'xl:hidden' : 'lg:hidden'}`}>
          <ArrowRight
            className={`${open ? '-rotate-90' : 'rotate-90'} -mt-0.5 h-6 
            text-primary-500 transition duration-200 ease-in-out`}
          />
        </div>
      </div>
      <div className={`${!open && 'hidden'} ${cssBreakingPoint === 'xl' ? 'xl:block' : 'lg:block'}`}>
        <div>
          {tocItems.map((item, index) => (
            <a
              className={twMerge(
                `pl-${2 ** (item.lvl - 1)} font-normal mb-1 block font-sans text-sm dark:text-white
                 text-gray-900 antialiased transition duration-100 ease-in-out hover:underline`,
                activeItem === getItemId(item) && '!text-primary-500 dark:!text-primary-500 font-bold'
              )}
              href={`#${getItemId(item)}`}
              key={index}
              data-testid='TOC-Link'
            >
              {item.content.replaceAll('`', '')}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
