import Link from 'next/link';

import IconHome from '../icons/Home'
import IconRocket from '../icons/Rocket'
import IconGradCap from '../icons/GradCap'
import IconPlant from '../icons/Plant'
import IconPaper from '../icons/Paper'

const buckets = {
  '/docs': {
    icon: IconHome,
    className: 'bg-primary-200 border-primary-200',
  },
  '/docs/concepts': {
    icon: IconRocket,
    className: 'bg-secondary-200 border-secondary-200',
  },
  '/docs/tutorials': {
    icon: IconGradCap,
    className: 'bg-pink-100 border-pink-100',
  },
  '/docs/tools': {
    icon: IconPlant,
    className: 'bg-green-200 border-green-200',
  },
  '/docs/reference': {
    icon: IconPaper,
    className: 'bg-yellow-200 border-yellow-200',
  },
};

export default function DocsNav({
  file,
  active,
  level = 0,
  onClick = () => {},
}) {
  const meta = file.meta;
  if (meta && meta.showInNav === false) {
    return null;
  }

  const isRoot = level === 0;
  const section = file.section;
  const files = file.files;
  const title = section ? section.title : file.meta.title;
  const slug = section ? section.slug : file.slug;
  const bucket = isRoot && buckets[section.slug];

  let className = '';
  let activeClassName = '';
  if (isRoot) {
    className = 'font-body font-regular text-sm text-black hover:font-semibold';
    activeClassName = 'font-semibold';
  } else if (files) {
    className = `font-body font-regular text-sm hover:font-semibold ${level > 1 ? 'text-gray-700 leading-7' : 'text-black leading-8'}`;
    activeClassName = 'font-semibold';
  } else {
    className = `font-body font-regular text-sm hover:text-secondary-600 ${level > 1 ? 'text-gray-700 leading-7' : 'text-black leading-8'}`;
    activeClassName = 'text-secondary-600';
  }

  return (
    <li className={isRoot ? 'mb-4' : ''} key={title}>
      <DocsNavItem title={title} slug={slug} bucket={bucket} activeSlug={active} files={files} className={className} activeClassName={activeClassName} onClick={onClick} />
      {files ? (
        <ul className={`border-l border-gray-200 pl-4 ${isRoot ? 'ml-3 mt-1' : ''}`}>
          {file.files.map(f => (
            <DocsNav file={f} active={active} level={level + 1} onClick={onClick} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function isActiveSlug(activeSlug, slug, files) {
  if (slug === activeSlug) return true;
  if (files) {
    for (const f of files) {
      const section = f.section;
      const isActive = isActiveSlug(activeSlug, section ? section.slug : f.slug, section ? f.files : undefined);
      if (isActive) {
        return true;
      }
    }
  }
  return false;
}

function DocsNavItem({ title, slug, activeSlug, bucket, files, onClick = () => {}, className = '', activeClassName = '' }) {
  const isActive = isActiveSlug(activeSlug, slug, files)
  const classes = `${isActive ? activeClassName : ''} ${className} inline-block`;

  return (
    <div className={classes}>
      <Link href={slug}>
        <a href={slug} onClick={onClick}>
          {bucket && (
            <div className={`${isActive ? bucket.className : ''} inline-block rounded`} style={{ marginRight: '5px', marginBottom: '-6px', padding: '2px' }}>
              <bucket.icon className='h-5 w-5' />
            </div>
          )}
          <span>{title}</span>
        </a>
      </Link>
    </div>
  );
}
