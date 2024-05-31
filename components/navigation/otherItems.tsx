interface OtherItem {
  text: string;
  href: string;
  target?: string;
  className?: string;
}

const otherItems: OtherItem[] = [
  { text: 'Case Studies', href: '/casestudies' },
  { text: 'Blog', href: '/blog' },
  // If you want to add target for a specific item, you can do it here
  { text: 'Roadmap', href: '/roadmap' }
];

export default otherItems;
