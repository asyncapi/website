import IconRocket from '../icons/Rocket'
import IconGradCap from '../icons/GradCap'
import IconPlant from '../icons/Plant'
import IconGuide from '../icons/Guide'
import IconPaper from '../icons/Paper'

export default [
  { href: '/docs/concepts', icon: IconRocket, className: 'bg-secondary-200', title: 'Concepts', description: 'Our Concepts section defines the concepts of AsyncAPI features and capabilities.' },
  { href: '/docs/tutorials', icon: IconGradCap, className: 'bg-pink-100', title: 'Tutorials', description: 'Our Tutorials section teaches beginner processes with AsyncAPI by doing. ' },
  { href: '/docs/tools', icon: IconPlant, className: 'bg-green-200', title: 'Tools', description: 'Our Tools section documents the AsyncAPI tools ecosystem.' },
  { href: '/docs/guides', icon: IconGuide, className: 'bg-primary-200', iconProps: { style: { stroke: '#E0D1FC' } }, title: 'Guides', description: 'Our Guides section shows at a high level how stuff work.' },
  { href: '/docs/reference', icon: IconPaper, className: 'bg-yellow-200', title: 'Reference', description: `Our Reference section documents the AsyncAPI specification.` }
]
