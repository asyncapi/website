import Link from 'next/link';
import React, { useContext } from 'react';

import type { DocsContextType } from '@/types/context/DocsContext';
import type { IDoc } from '@/types/post';

import DocsContext from '../../context/DocsContext';
import IconArrowRight from '../icons/ArrowRight';

interface TutorialListProps {
  className?: string;
}

/**
 * @description Renders a list of tutorials based on the current post and navigation items.
 * @param {Object} props - The properties passed to the TutorialList component.
 * @param {string} [props.className=''] - Additional CSS classes for styling.
 */
export default function TutorialList({ className = '' }: TutorialListProps) {
  const { post, navItems }: DocsContextType = useContext(DocsContext);

  const tutorials: IDoc[] = Object.values(navItems).filter(
    (item) =>
      'sectionSlug' in item &&
      'isIndex' in item &&
      'slug' in item &&
      'title' in item &&
      'description' in item &&
      typeof item.slug === 'string' &&
      item.sectionSlug === post.slug &&
      !item.isIndex
  ) as IDoc[];

  return (
    <div className={`${className} grid grid-cols-1 gap-4 sm:grid-cols-2`}>
      {tutorials.map((tuto: IDoc, index: number) => (
        <Link href={tuto.slug} key={index}>
          <span className='mt-4 flex max-w-lg cursor-pointer flex-col rounded border border-gray-200 p-6 text-gray-700 shadow-md transition-all duration-300 ease-in-out hover:border-gray-300 hover:shadow-lg'>
            <h5 className='mb-2 font-sans text-lg font-medium antialiased'>{tuto.title}</h5>
            <p className='font-normal mb-2 flex-1 font-sans antialiased'>{tuto.description}</p>
            <p className='font-sans font-medium text-primary-600 antialiased'>
              Start tutorial
              <IconArrowRight className='inline-block h-4' />
            </p>
          </span>
        </Link>
      ))}
    </div>
  );
}
