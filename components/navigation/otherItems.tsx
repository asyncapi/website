interface OtherItem {
  text: string;
  href: string;
  target?: string;
  className?: string;
}

const otherItems: OtherItem[] = [
  { text: 'Case Studies', href: '/casestudies' },
  { text: 'Blog', href: '/blog' }
];

export default otherItems;
