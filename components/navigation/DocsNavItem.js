import Link from 'next/link';

export default function DocsNavItem({ title, slug, active, activeSlug, onClick = () => {}, className = '', activeClassName = '', Icon }) {
  const isActive = slug === '/docs' ? slug === activeSlug : active || activeSlug === slug || (Icon && activeSlug.startsWith(slug));
  const classes = `${isActive ? activeClassName : ''} ${className} inline-block`

  return (
    <Link href={slug}>
      <div>
        {Icon && <Icon className={`${(slug === '/docs' ? slug === activeSlug : activeSlug.startsWith(slug)) ? 'bg-red-200 border-red-200' : ''} h-5 w-5 inline-block border rounded border-white`} style={{ marginLeft: '3px', marginTop: '-1px' }} />}
        <div className={classes}>
          <a href={slug} onClick={onClick}>
            {title}
          </a>
        </div>
      </div>
    </Link>
  );
}