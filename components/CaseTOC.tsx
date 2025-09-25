import React, { useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { useHeadingsObserver } from './helpers/useHeadingsObserver';
import ArrowRight from './icons/ArrowRight';

interface TocItem {
  lvl: number;
  content: string;
  slug: string;
  children?: TocItem[];
}

interface TOCItemProps {
  item: TocItem;
  index: number;
  currSelected: string;
  closeMenu: () => void;
}

interface CaseTOCProps {
  className: string;
  cssBreakingPoint?: 'xl' | 'lg';
  toc: any[];
}

/**
 * @description Checks if the item is active.
 *
 * @param {TocItem} item - The TOC item to check.
 * @param {string} currSelected - The currently selected TOC item.
 * @returns {boolean} - True if the item is active, otherwise false.
 */
const checkIfActive = (item: TocItem, currSelected: string): boolean => {
  return item.slug === currSelected || item.children?.some((child) => checkIfActive(child, currSelected)) || false;
};

/**
 *  @description Converts content to TOC items.
 *
 * @param {any[]} content - The content to convert to TOC items.
 * @param {number} level - The level of the TOC item.
 * @returns {TocItem[]} - The array of TOC items.
 */
const convertContentToTocItems = (content: any[], level: number = 1): TocItem[] => {
  const tocItems = [];

  for (const section of content) {
    const item = {
      lvl: level,
      content: section.title,
      slug: section.title
        .replace(/<|>|"|\\|\/|=/gi, '')
        .replace(/\s/gi, '-')
        .toLowerCase()
    };

    if (section.children && section.children.length > 0) {
      const children = convertContentToTocItems(section.children, level + 1);

      (item as TocItem).children = children;
    }

    tocItems.push(item);
  }

  return tocItems;
};

/**
 * @description Component representing an item in the table of contents (TOC).
 *
 * @param {TOCItemProps} props - The props for TOCItem.
 * @param {TocItem} props.item - The TOC item.
 * @param {number} props.index - The index of the TOC item.
 * @param {string} props.currSelected - The currently selected TOC item.
 * @param {Function} props.closeMenu - A function to close the menu.
 */
function TOCItem({ item, index, currSelected, closeMenu }: TOCItemProps) {
  const [open, setOpen] = useState(false);
  const active = useMemo(() => checkIfActive(item, currSelected), [item, currSelected]);

  const handleClick = () => {
    closeMenu();
    setOpen(false);
  };

  return (
    <>
      <nav className='relative block max-w-max'>
        <a
          className={twMerge(
            'font-normal mb-1 flex items-center font-sans text-sm text-gray-900 antialiased transition duration-100 ease-in-out hover:underline',
            active && 'font-bold text-primary-500'
          )}
          href={`#${item.slug}`}
          key={index}
          style={{ marginLeft: `${(item.lvl - 1) * 16}px` }}
          onClick={handleClick}
        >
          {item.content}
        </a>
        {item.children && item.children.length > 0 && (
          <span onClick={() => setOpen(!open)} className='absolute -right-6 top-0 cursor-pointer '>
            <ArrowRight
              className={`${open ? 'rotate-90' : '0'} h-5 text-gray-500 transition duration-200 ease-in-out`}
            />
          </span>
        )}
      </nav>
      {item.children && item.children.length > 0 && (
        <ul
          className={`relative left-0 ${
            open ? 'max-h-[1000px]' : 'max-h-[0.01px]'
          } overflow-hidden transition-all duration-300 ease-in-out`}
        >
          {item.children.map((child_item, child_index) => (
            <TOCItem
              item={child_item}
              index={child_index}
              key={index}
              closeMenu={closeMenu}
              currSelected={currSelected}
            />
          ))}
        </ul>
      )}
    </>
  );
}

/**
 * @description Component representing a table of contents (TOC) for a case.
 *
 * @param {CaseTOCProps} props - The props for CaseTOC.
 * @param {string} props.className - The CSS class name for the component.
 * @param {("xl"|"lg")} [props.cssBreakingPoint="xl"] - The CSS breaking point for responsiveness.
 * @param {any[]} props.toc - The table of contents data.
 */
export default function CaseTOC({ className, cssBreakingPoint = 'xl', toc }: CaseTOCProps) {
  const { currActive: selected } = useHeadingsObserver();
  const [open, setOpen] = useState(false);
  const tocItems = useMemo(() => convertContentToTocItems(toc), [toc]);

  if (!toc || !toc.length) return null;

  return (
    <div
      className={twMerge(
        `${className} ${tocItems.length ? '' : 'hidden'} ${
          cssBreakingPoint === 'xl' ? 'xl:block' : 'lg:block'
        } md:top-24 md:max-h-(screen-14) z-20`
      )}
    >
      <div
        className={`flex cursor-pointer ${tocItems.length ? '' : 'hidden'} ${
          cssBreakingPoint === 'xl' ? 'xl:cursor-auto' : 'lg:cursor-auto'
        } xl:mt-2`}
      >
        <h5
          className={twMerge(
            `${
              open && 'mb-4'
            } flex-1 text-primary-500 font-medium uppercase tracking-wide text-sm font-sans antialiased ${
              cssBreakingPoint === 'xl'
                ? 'xl:mb-4 xl:text-xs xl:text-gray-900 xl:font-bold'
                : 'lg:mb-4 lg:text-xs lg:text-gray-900 lg:font-bold'
            }`
          )}
        >
          On this page
        </h5>
        <div
          className={`text-underline p4 text-center ${cssBreakingPoint === 'xl' ? 'xl:hidden' : 'lg:hidden'}`}
          onClick={() => setOpen(!open)}
        >
          <ArrowRight
            className={`${
              open ? '-rotate-90' : 'rotate-90'
            } -mt-0.5 h-6 text-primary-500 transition duration-200 ease-in-out`}
          />
        </div>
      </div>
      <div className={`${!open && 'hidden'} ${cssBreakingPoint === 'xl' ? 'xl:block' : 'lg:block'}`}>
        <ul className='mt-2'>
          {tocItems.map((item, index) => (
            <TOCItem
              item={item}
              index={index}
              key={index}
              closeMenu={() => setOpen(false)}
              currSelected={selected || ''}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
