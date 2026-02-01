export interface EditPageButtonProps {
  slug: string;
  contentType: 'blog' | 'docs' | 'about';
  className?: string;
  variant?: 'inline' | 'floating';
}

export interface EditPageButtonState {
  editUrl: string | null;
  hasError: boolean;
}

export interface URLMappingConfig {
  baseGitHubUrl: string;
  branch: string;
  contentMappings: ContentMapping[];
}

export interface ContentMapping {
  urlPattern: string;
  sourceDirectory: string;
  fileExtension: '.md' | '.mdx';
  customMapper?: (slug: string) => string;
}

export interface URLMapperResult {
  editUrl: string;
  success: boolean;
  error?: string;
}

export interface EditPageContextValue {
  config: URLMappingConfig;
  enabled: boolean;
  trackEditClick?: (slug: string, contentType: string) => void;
}

export interface EditPageConfigEntry {
  value: string;
  href: string;
  contentType?: 'blog' | 'docs' | 'about';
}

export interface URLMappingCacheEntry {
  editUrl: string;
  contentType: 'blog' | 'docs' | 'about';
  success: boolean;
  error?: string;
  computedAt: string;
}

export interface URLMappingCache {
  mappings: Map<string, URLMappingCacheEntry>;
  buildTime: string;
  version: string;
}
