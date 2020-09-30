import IconHub from '../icons/Hub'
import IconGenerator from '../icons/Generator'
// import IconReact from '../icons/React'
import IconGithubActions from '../icons/GithubActions'
import IconParser from '../icons/Parser'
// import IconPlugins from '../icons/Plugins'

export default [
  { href: '/studio', icon: IconHub, title: 'Studio', description: 'Visually design your AsyncAPI files and event-driven architecture.', comingSoon: true },
  { href: '/generator', icon: IconGenerator, title: 'Generator', description: 'Use your AsyncAPI files to generate documentation, code, anything!' },
  // { href: '/react', icon: IconReact, title: 'React Component', description: 'Embed your AsyncAPI documentation in your React application.' },
  { href: '/github-actions', icon: IconGithubActions, title: 'Github Actions', description: 'Automate the validation and generation of documentation.' },
  { href: '/parsers', icon: IconParser, title: 'Parsers', description: 'Parse AsyncAPI documents right inside your tools and products.' },
  // { href: '/ide-plugins', icon: IconPlugins, title: 'IDE plugins and extensions', description: 'Edit your AsyncAPI files right inside your favourite code editor.' },
]
