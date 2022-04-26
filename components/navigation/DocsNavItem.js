import Link from 'next/link';

function isActiveSlug(slug, activeSlug) {
  const partialSlug = slug.split('/');
  const partialActiveSlug = activeSlug.split('/');
  const activeParts = partialActiveSlug.filter((a, idx) => a === partialSlug[idx]);
  return activeParts.length === partialSlug.length;
}

export default function DocsNavItem({ title, slug, href, indexDocument, activeSlug, onClick = () => {}, className = '', activeClassName = '', bucket }) {
  const isActive = slug === '/docs' || indexDocument ? slug === activeSlug : isActiveSlug(slug, activeSlug);
  const classes = `${isActive ? activeClassName : ''} ${className} inline-block`;

  return (
    <div className='inline-block'>
      <div className={classes}>
        <Link href={href || slug}>
          <a href={href || slug} onClick={onClick}>
            {bucket && <bucket.icon className={`${(slug === '/docs' ? slug === activeSlug : activeSlug.startsWith(slug)) ? bucket.className : ''} h-5 w-5 inline-block border-2 rounded border-white`} style={{ marginLeft: '3px', marginRight: '6px', marginTop: '-2px' }} />}
            <span>{title}</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
