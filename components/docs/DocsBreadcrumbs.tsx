import Link from 'next/link';
import React from 'react';

import type { Breadcrumb } from '@/utils/getDocsBreadcrumbs';

import IconArrowRight from '../icons/ArrowRight';

interface IDocsBreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

/**
 * @description Renders the breadcrumb trail shown above a docs page title so
 * readers landing on a nested page can see where they are and jump to a parent
 * section. Useful on mobile where the sidebar is collapsed behind the menu.
 *
 * @param {Breadcrumb[]} props.breadcrumbs - The ordered breadcrumb trail.
 */
export default function DocsBreadcrumbs({ breadcrumbs }: IDocsBreadcrumbsProps) {
  if (breadcrumbs.length < 2) return null;

  return (
    <nav aria-label='Breadcrumb' className='mb-4' data-testid='DocsBreadcrumbs'>
      <ol className='flex flex-wrap items-center gap-x-1 text-sm text-gray-500 dark:text-dark-text'>
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.slug} className='flex items-center gap-x-1'>
            {index > 0 && <IconArrowRight className='size-4 shrink-0 text-gray-400 dark:text-gray-500' />}
            {crumb.isCurrent ? (
              <span className='font-medium text-gray-700 dark:text-dark-heading' aria-current='page'>
                {crumb.title}
              </span>
            ) : (
              <Link
                href={crumb.slug}
                className='transition-colors hover:text-secondary-500 hover:underline focus:text-secondary-500 focus:outline-none'
              >
                {crumb.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
