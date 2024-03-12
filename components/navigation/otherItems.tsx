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
  // { text: "Shop", href: "https://asyncapi.threadless.com", target: "_blank" },
  { text: 'Roadmap', href: '/roadmap', className: 'text-secondary-500 font-bold' }
];

export default otherItems;
