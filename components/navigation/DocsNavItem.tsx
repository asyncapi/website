import Link from 'next/link';

import type { DocsNavItemProps } from '@/types/navigation/DocsNavItem';

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
 * @param {DocsNavItemProps} props - The props for the DocsNavItem component.
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
        <Link href={href || slug}>
          <a className='inline-block w-full' href={href || slug} onClick={onClick}>
            {bucket && (
              <div className={`${(slug === '/docs' ? slug === activeSlug : activeSlug.startsWith(slug)) ? bucket.className : ''} inline-block rounded`} style={{ marginRight: '5px', marginBottom: '-6px', padding: '2px' }}>
                <bucket.icon className='size-5' />
              </div>
            )}
            <span>{title}</span>
          </a>
        </Link>
      </div>
    </div>
  );
};
