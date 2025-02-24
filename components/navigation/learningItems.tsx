import type React from 'react';

import IconExplorer from '../icons/Explorer';
import IconGradCap from '../icons/GradCap';
import IconGuide from '../icons/Guide';
import IconMigration from '../icons/Migration';
import IconPaper from '../icons/Paper';
import IconPlant from '../icons/Plant';
import IconRocket from '../icons/Rocket';
import IconUsers from '../icons/Users';

interface LearningItem {
  href: string;
  icon: React.ComponentType<any>;
  className: string;
  title: string;
  description: string;
}

const learningItems: LearningItem[] = [
  {
    href: '/docs/concepts',
    icon: IconRocket,
    className: 'bg-secondary-200',
    title: 'Concepts',
    description: 'Our Concepts section defines the concepts of AsyncAPI features and capabilities.'
  },
  {
    href: '/docs/tutorials',
    icon: IconGradCap,
    className: 'bg-pink-100',
    title: 'Tutorials',
    description: 'Our Tutorials section teaches beginner processes with AsyncAPI, guiding you from Point A to Point B.'
  },
  {
    href: '/docs/tools',
    icon: IconPlant,
    className: 'bg-green-200',
    title: 'Tools',
    description: 'Our Tools section documents the AsyncAPI tools ecosystem.'
  },
  {
    href: '/docs/guides',
    icon: IconGuide,
    className: 'bg-primary-200',
    title: 'Guides',
    description: "Our Guides section teaches AsyncAPI's capabilities at a high level."
  },
  {
    href: '/docs/reference',
    icon: IconPaper,
    className: 'bg-yellow-200',
    title: 'Reference',
    description: 'Our Reference section documents the AsyncAPI specification.'
  },
  {
    href: '/docs/migration',
    icon: IconMigration,
    className: 'bg-blue-400',
    title: 'Migration',
    description: 'Our migration guides on how to upgrade to newer AsyncAPI versions.'
  },
  {
    href: '/docs/community',
    icon: IconUsers,
    className: 'bg-red-200',
    title: 'Community',
    description: 'Our Community section documents the community guidelines and resources.'
  },
  {
    href: '/docs/reference/specification/v3.0.0-explorer',
    icon: IconExplorer,
    className: 'bg-teal-200',
    title: 'Specification Explorer',
    description: 'Simplifying our Specification JSON Schema like a pro.'
  }
];

export default learningItems;
