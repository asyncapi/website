import Link from 'next/link';
import React from 'react';

export interface DocsNavItemProps {
  title: string;
  slug: string;
  href?: string;
  activeSlug: string;
  sectionSlug?: string;
  onClick?: () => void;
  defaultClassName?: string;
  inactiveClassName?: string;
  activeClassName?: string;
  bucket?: {
    className: string;
    icon: React.ComponentType<any>;
  };
}

/**
 * @description Determines if a given slug is active.
 * @param {string} slug - The slug of the item.
 * @param {string} activeSlug - The active slug.
 * @param {string | undefined} sectionSlug - The slug of the section.
 */
function isActiveSlug(slug: string, activeSlug: string, sectionSlug?: string): boolean {
  if (slug === '/docs' || (sectionSlug !== undefined && slug === sectionSlug)) {
    return slug === activeSlug;
  }

  const partialSlug = slug.split('/');
  const partialActiveSlug = activeSlug.split('/');
  const activeParts = partialActiveSlug.filter((a, idx) => a === partialSlug[idx]);

  return activeParts.length === partialSlug.length;
}

/**
 * @description Component representing an item in the documentation navigation.
 * @param {string} props.title - The title of the navigation item.
 * @param {string} props.slug - The slug representing the item.
 * @param {string} [props.href] - The href for the link.
 * @param {string} props.activeSlug - The active slug.
 * @param {string} [props.sectionSlug] - The slug of the section.
 * @param {() => void} [props.onClick] - Function to call when the item is clicked.
 * @param {string} [props.defaultClassName] - Default class name for the item.
 * @param {string} [props.inactiveClassName] - Class name when the item is inactive.
 * @param {string} [props.activeClassName] - Class name when the item is active.
 * @param {object} [props.bucket] - Optional bucket configuration.
 * @param {string} props.bucket.className - Class name for the bucket.
 * @param {React.ComponentType<any>} props.bucket.icon - Icon component for the bucket.
 */
export default function DocsNavItem({
  title,
  slug,
  href,
  activeSlug,
  sectionSlug,
  onClick = () => {},
  defaultClassName = '',
  inactiveClassName = '',
  activeClassName = '',
  bucket
}: DocsNavItemProps) {
  const isActive = isActiveSlug(slug, activeSlug, sectionSlug);
  const classes = `${isActive ? activeClassName : inactiveClassName} ${defaultClassName} inline-block w-full`;

  return (
    <div>
      <div className={classes}>
        <Link href={href || slug} className='inline-block w-full' onClick={onClick}>
          {bucket && (
            <div
              className={`${(slug === '/docs' ? slug === activeSlug : activeSlug.startsWith(slug)) ? bucket.className : ''} inline-block rounded`}
              style={{ marginRight: '5px', marginBottom: '-6px', padding: '2px' }}
            >
              <bucket.icon className='size-5' />
            </div>
          )}
          <span>{title}</span>
        </Link>
      </div>
    </div>
  );
}
