export interface Link {
  repoUrl?: string;
  websiteUrl?: string;
  docsUrl?: string;
};

export interface Filter {
  categories: string[];
  hasCommercial: boolean;
  isAsyncAPIOwner: boolean;
  language: { name: string; color: string; borderColor: string }[];
  technology: { name: string; color: string; borderColor: string }[];
};

export interface ToolData {
  title: string;
  description: string;
  links: Link;
  filters: Filter;
};
