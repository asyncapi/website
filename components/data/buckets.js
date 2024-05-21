import IconGettingStarted from '../icons/GettingStarted'
import IconTutorials from '../icons/Tutorials'
import IconUseCases from '../icons/UseCases'
import IconGuide from '../icons/Guide'
import IconSpec from '../icons/Spec'
import IconUsers from '../icons/Users'
import IconMigration from '../icons/Migration'
import Explorer from '../icons/Explorer'

export const buckets = [
  {
    name: 'concepts',
    title: 'Concepts',
    description: 'Our Concepts section defines the concepts of AsyncAPI features and capabilities.',
    link: '/docs/concepts',
    className: 'bg-secondary-200',
    borderClassName: 'border-secondary-200',
    Icon: IconGettingStarted,
  },
  {
    name: 'tutorials',
    title: 'Tutorials',
    description: 'Our Tutorials section teaches beginner processes with AsyncAPI, guiding you from Point A to Point B.',
    link: '/docs/tutorials',
    className: 'bg-pink-100',
    borderClassName: 'border-pink-100',
    Icon: IconTutorials,
  },
  {
    name: 'guides',
    title: 'Guides',
    description: "Our Guides section teaches AsyncAPI's capabilities at a high level.",
    link: '/docs/guides',
    className: 'bg-primary-200',
    borderClassName: 'border-primary-200',
    Icon: IconGuide,
  },
  {
    name: 'tools',
    title: 'Tools',
    description: 'Our Tools section documents the AsyncAPI tools ecosystem.',
    link: '/docs/tools',
    className: 'bg-green-200',
    borderClassName: 'border-green-200',
    Icon: IconUseCases,
  },
  {
    name: 'reference',
    title: 'Reference',
    description: 'Our Reference section documents the AsyncAPI specification.',
    link: '/docs/reference',
    className: 'bg-yellow-200',
    borderClassName: 'border-yellow-200',
    Icon: IconSpec,
  },
  {
    name: 'migration',
    title: 'Migration',
    description: 'Our migration guides on how to upgrade to newer AsyncAPI versions.',
    link: '/docs/migration',
    className: 'bg-blue-400',
    borderClassName: 'border-blue-400',
    Icon: IconMigration,
  },
  {
    name: 'community',
    title: 'Community',
    description: 'Our Community section documents the community guidelines and resources.',
    link: '/docs/community',
    className: 'bg-orange-200',
    borderClassName: 'border-orange-200',
    Icon: IconUsers,
  },
    {
    name: 'Explorer',
    title: 'Specification Explorer',
    description: 'Simplifying our Specification JSON Schema like a pro.',
    link: '/docs/reference/specification/v3.0.0-Explorer',
    className: 'bg-teal-200',
    borderClassName: 'border-orange-200',
    Icon: Explorer,
  },
].map(bucket => {
  // we need such a mapping for some parts of website, e.g navigation blocks use the `icon` property, not `Icon` etc.
  return {
    ...bucket,
    href: bucket.link,
    icon: bucket.Icon,
  };
});
