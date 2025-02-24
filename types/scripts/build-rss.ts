export type BlogPostTypes = 'docs' | 'blog' | 'about' | 'docsTree';
export type Enclosure = {
  '@url': string;
  '@length': number;
  '@type': string;
  enclosure?: Enclosure;
};

export type RSSItemType = {
  title: string;
  description: string;
  link: string;
  category: BlogPostTypes;
  guid: {
    '@isPermaLink': boolean;
    '': string;
  };
  pubDate: string;
  enclosure: Enclosure;
};
export type RSS = {
  '@version': string;
  '@xmlns:atom': string;
  channel: {
    title: string;
    link: string;
    'atom:link': {
      '@rel': string;
      '@href': string;
      '@type': string;
    };
    description: string;
    language: string;
    copyright: string;
    webMaster: string;
    pubDate: string; // UTC string format
    generator: string;
    item: RSSItemType[];
  };
};
