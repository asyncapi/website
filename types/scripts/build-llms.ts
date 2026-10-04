import type { Details, Result } from './build-posts-list';

export type LlmsContentKind = 'docs' | 'blog' | 'about';

export interface ConvertMarkdownOptions {
  title?: string;
  description?: string;
  excerpt?: string;
  slug?: string;
  knownMarkdownSlugs?: Set<string>;
  readFragment?: (repoPath: string) => string | undefined;
  siteBaseUrl?: string;
}

export interface GenerateLlmsOptions {
  posts?: Result;
  markdownDir?: string;
  publicDir?: string;
  siteRoot?: string;
}

export interface LlmsSection {
  id: string;
  title: string;
  optional: boolean;
  pages: Details[];
}
