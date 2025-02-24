import React, { useState } from 'react';
import Scrollspy from 'react-scrollspy';
import { twMerge } from 'tailwind-merge';

import ArrowRight from './icons/ArrowRight';

interface ITOCProps {
  className?: string;
  cssBreakingPoint?: string;
  toc: {
    lvl: number;
    content: string;
    slug: string;
  }[];
  contentSelector?: string;
  depth?: number;
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

  if (!toc || !toc.length) return null;
  const minLevel = toc.reduce((mLevel, item) => (!mLevel || item.lvl < mLevel ? item.lvl : mLevel), 0);
  const tocItems = toc
    .filter((item) => item.lvl <= minLevel + depth)
    .map((item) => ({
      ...item,
      content: item.content.replace(/[\s]?\{#[\w\d\-_]+\}$/, '').replace(/(<([^>]+)>)/gi, ''),
      // For TOC rendering in specification files in the spec repo we have "a" tags added manually to the spec
      // markdown document MDX takes these "a" tags and uses them to render the "id" for headers like
      // a-namedefinitionsapplicationaapplication slugWithATag contains transformed heading name that is later used
      // for scroll spy identification
      slugWithATag: item.content
        .replace(/[<>?!:`'."\\/=@#$%^&*()[\]{}+,;]/gi, '')
        .replace(/\s/gi, '-')
        .toLowerCase()
    }));

  return (
    <div
      className={twMerge(`${className} ${tocItems.length ? '' : 'hidden'} 
      ${cssBreakingPoint === 'xl' ? 'xl:block' : 'lg:block'} md:top-24 md:max-h-(screen-14) mb-4 z-20`)}
      onClick={() => setOpen(!open)}
    >
      <div
        className={`flex cursor-pointer ${tocItems.length ? '' : 'hidden'}
        ${cssBreakingPoint === 'xl' ? 'xl:cursor-auto' : 'lg:cursor-auto'} xl:mt-2`}
      >
        <h5
          className={twMerge(`${open && 'mb-4'} flex-1 text-primary-500 font-medium uppercase tracking-wide 
          text-sm font-sans antialiased ${
            cssBreakingPoint === 'xl'
              ? `xl:mb-4 xl:text-xs xl:text-gray-900 
          xl:font-bold`
              : 'lg:mb-4 lg:text-xs lg:text-gray-900 lg:font-bold'
          }`)}
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
        <Scrollspy
          items={tocItems.map((item) => (item.slug ? item.slug : item.slugWithATag))}
          currentClassName='text-primary-500 font-bold'
          componentTag='div'
          rootEl={contentSelector}
          offset={-120}
        >
          {tocItems.map((item, index) => (
            <a
              className={`pl-${2 ** (item.lvl - 1)} font-normal mb-1 block font-sans text-sm 
                  text-gray-900 antialiased transition duration-100 ease-in-out hover:underline`}
              href={`#${item.slug ? item.slug : item.slugWithATag}`}
              key={index}
              data-testid='TOC-Link'
            >
              {item.content.replaceAll('`', '')}
            </a>
          ))}
        </Scrollspy>
      </div>
    </div>
  );
}
