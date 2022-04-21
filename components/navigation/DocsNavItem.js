import Link from 'next/link';

export default function DocsNavItem({ title, slug, active, activeSlug, onClick = () => {}, className = '', activeClassName = '', bucket }) {
  const isActive = slug === '/docs' ? slug === activeSlug : active || activeSlug === slug || (bucket && activeSlug.startsWith(slug));
  const classes = `${isActive ? activeClassName : ''} ${className} inline-block`;

  return (
    <div className='inline-block'>
      <div className={classes}>
        <Link href={slug}>
          <a href={slug} onClick={onClick}>
            {bucket && <bucket.icon className={`${(slug === '/docs' ? slug === activeSlug : activeSlug.startsWith(slug)) ? bucket.className : ''} h-5 w-5 inline-block border rounded border-white`} style={{ marginLeft: '3px', marginRight: '6px', marginTop: '-1px' }} />}
            <span>{title}</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
