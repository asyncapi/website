export interface TableOfContentsItem {
  content: string;
  slug: string;
  lvl: number;
}

export interface Details {
  title: string;
  isSection?: boolean;
  parent?: string;
  sectionId?: string;
  isRootSection?: boolean;
  rootSectionId?: string;
  sectionWeight?: number;
  slug?: string;
  toc?: TableOfContentsItem[];
  readingTime?: number;
  excerpt?: string;
  sectionSlug?: string;
  sectionTitle?: string;
  id?: string;
  isIndex?: boolean;
  weight?: number;
  releaseNoteLink?: string;
  isPrerelease?: boolean;
  [key: string]: any; // For any additional properties
}

export interface Result {
  docs: any[];
  blog: any[];
  about: any[];
  docsTree: Record<string, any>;
}
