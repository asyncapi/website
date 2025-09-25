import type React from 'react';

import IconExplorer from '../icons/Explorer';
import IconGettingStarted from '../icons/GettingStarted';
import IconGuide from '../icons/Guide';
import IconMigration from '../icons/Migration';
import IconSpec from '../icons/Spec';
import IconTutorials from '../icons/Tutorials';
import IconUseCases from '../icons/UseCases';
import IconUsers from '../icons/Users';

export interface Bucket {
  name: string;
  title: string;
  description: string;
  link: string;
  className: string;
  borderClassName: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const buckets: Bucket[] = [
  {
    name: 'concepts',
    title: 'Concepts',
    description: 'Our Concepts section defines the concepts of AsyncAPI features and capabilities.',
    link: '/docs/concepts',
    className: 'bg-secondary-200',
    borderClassName: 'border-secondary-200',
    href: '/docs/concepts',
    icon: IconGettingStarted
  },
  {
    name: 'tutorials',
    title: 'Tutorials',
    description: 'Our Tutorials section teaches beginner processes with AsyncAPI, guiding you from Point A to Point B.',
    link: '/docs/tutorials',
    className: 'bg-pink-100',
    borderClassName: 'border-pink-100',
    href: '/docs/tutorials',
    icon: IconTutorials
  },
  {
    name: 'guides',
    title: 'Guides',
    description: "Our Guides section teaches AsyncAPI's capabilities at a high level.",
    link: '/docs/guides',
    className: 'bg-primary-200',
    borderClassName: 'border-primary-200',
    href: '/docs/guides',
    icon: IconGuide
  },
  {
    name: 'tools',
    title: 'Tools',
    description: 'Our Tools section documents the AsyncAPI tools ecosystem.',
    link: '/docs/tools',
    className: 'bg-green-200',
    borderClassName: 'border-green-200',
    href: '/docs/tools',
    icon: IconUseCases
  },
  {
    name: 'reference',
    title: 'Reference',
    description: 'Our Reference section documents the AsyncAPI specification.',
    link: '/docs/reference',
    className: 'bg-yellow-200',
    borderClassName: 'border-yellow-200',
    href: '/docs/reference',
    icon: IconSpec
  },
  {
    name: 'migration',
    title: 'Migration',
    description: 'Our migration guides on how to upgrade to newer AsyncAPI versions.',
    link: '/docs/migration',
    className: 'bg-blue-400',
    borderClassName: 'border-blue-400',
    href: '/docs/migration',
    icon: IconMigration
  },
  {
    name: 'community',
    title: 'Community',
    description: 'Our Community section documents the community guidelines and resources.',
    link: '/docs/community',
    className: 'bg-orange-200',
    borderClassName: 'border-orange-200',
    href: '/docs/community',
    icon: IconUsers
  },
  {
    name: 'Explorer',
    title: 'Specification Explorer',
    description: 'Simplifying our Specification JSON Schema like a pro.',
    link: '/docs/reference/specification/v3.0.0-explorer',
    className: 'bg-teal-200',
    borderClassName: 'border-orange-200',
    icon: IconExplorer
  }
].map((bucket) => {
  return {
    ...bucket,
    href: bucket.link,
    icon: bucket.icon
  };
});
