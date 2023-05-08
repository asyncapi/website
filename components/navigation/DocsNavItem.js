import Link from 'next/link';

function isActiveSlug(slug, activeSlug, sectionSlug) {
  if(slug === '/docs' || (sectionSlug !== undefined && slug === sectionSlug)) {
    return (slug == activeSlug)
  }
  
  const partialSlug = slug.split('/');
  const partialActiveSlug = activeSlug.split('/');
  const activeParts = partialActiveSlug.filter((a, idx) => a === partialSlug[idx]);
  return activeParts.length === partialSlug.length;
}

export default function DocsNavItem({ title, slug, href, activeSlug, sectionSlug, onClick = () => {}, defaultClassName = '', inactiveClassName = '', activeClassName = '', bucket }) {
  const isActive = isActiveSlug(slug, activeSlug, sectionSlug);
  const classes = `${isActive ? activeClassName : inactiveClassName} ${defaultClassName} inline-block`;

  return (
    <div className='inline-block'>
      <div className={classes}>
        <Link href={href || slug}>
          <a href={href || slug} onClick={onClick}>
            {bucket && (
              <div className={`${(slug === '/docs' ? slug === activeSlug : activeSlug.startsWith(slug)) ? bucket.className : ''} inline-block rounded`} style={{ marginRight: '5px', marginBottom: '-6px', padding: '2px' }}>
                <bucket.icon className='h-5 w-5' />
              </div>
            )}
            <span>{title}</span>
          </a>
        </Link>
      </div>
    </div>
  );
}