import IconRocket from '../icons/Rocket'
import IconGradCap from '../icons/GradCap'
import IconPlant from '../icons/Plant'
import IconGuide from '../icons/Guide'
import IconPaper from '../icons/Paper'
import IconUsers from '../icons/Users'
import IconMigration from '../icons/Migration'

export default [
  { href: '/docs/concepts', icon: IconRocket, className: 'bg-secondary-200', title: 'Concepts', description: 'Our Concepts section defines the concepts of AsyncAPI features and capabilities.' },
  { href: '/docs/tutorials', icon: IconGradCap, className: 'bg-pink-100', title: 'Tutorials', description: 'Our Tutorials section teaches beginner processes with AsyncAPI, guiding you from Point A to Point B.' },
  { href: '/docs/tools', icon: IconPlant, className: 'bg-green-200', title: 'Tools', description: 'Our Tools section documents the AsyncAPI tools ecosystem.' },
  { href: '/docs/guides', icon: IconGuide, className: 'bg-primary-200', title: 'Guides', description: `Our Guides section teaches AsyncAPI's capabilities at a high level.` },
  { href: '/docs/reference', icon: IconPaper, className: 'bg-yellow-200', title: 'Reference', description: `Our Reference section documents the AsyncAPI specification.` },
  { href: '/docs/migration', icon: IconMigration, className: 'bg-blue-400', title: 'Migrations', description: `Our migration guides on how to upgrade to newer AsyncAPI versions.` },
  { href: '/docs/community', icon: IconUsers, className: 'bg-red-200', title: 'Community', description: `Our Community section documents the community guidelines and resources.` },
]
