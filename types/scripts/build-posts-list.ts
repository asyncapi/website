import type { NavTree } from './build-docs';

export interface TableOfContentsItem {
  content: string;
  slug: string;
  lvl: number;
  i: number;
}
export type NavigationPage = {
  title: string;
  href?: string;
};
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
  nextPage?: NavigationPage;
  prevPage?: NavigationPage;
  [key: string]: any; // For any additional properties
}

export interface Result {
  docs: Details[];
  blog: Details[];
  about: Details[];
  docsTree: NavTree;
}
