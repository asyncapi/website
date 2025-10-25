interface Links {
  websiteUrl?: string; // URL to the website where your project hosts some demo or project landing page.
  docsUrl?: string; // URL to project documentation.
  repoUrl?: string; // URL to project codebase.
}

export type Category =
  | 'api'
  | 'code-first'
  | 'code-generator'
  | 'converter'
  | 'directory'
  | 'documentation-generator'
  | 'editor'
  | 'ui-component'
  | 'dsl'
  | 'framework'
  | 'github-action'
  | 'mocking-and-testing'
  | 'validator'
  | 'compare-tool'
  | 'other'
  | 'cli'
  | 'bundler'
  | 'ide-extension';

// Base types
export type CategoryListItem = {
  name: string;
  tag: string;
  description: string;
};

export type LanguageColorItem = {
  name: string;
  color: string;
  borderColor: string;
};

// Filter types
export interface Filters {
  language?: Array<string> | string;
  technology?: Array<string>;
  categories: Array<Category>;
  hasCommercial?: boolean;
  isAsyncAPIOwner?: boolean;
}

// Instead of extending BaseFilters, create a separate interface
export interface FinalFilters {
  language: LanguageColorItem[];
  technology: LanguageColorItem[];
  categories: Array<Category>;
  hasCommercial: boolean;
}

// Tool types
type BaseAsyncAPITool = {
  title: string;
  description?: string;
  links?: Links;
};

export interface AsyncAPITool extends BaseAsyncAPITool {
  filters: Filters;
}

export interface FinalAsyncAPITool extends BaseAsyncAPITool {
  description: string; // Make required in final
  filters: FinalFilters;
}

// Repository and tools data types
type Repository = {
  full_name: string;
  html_url: string;
  owner: {
    login: string;
  };
  description: string;
};

type ToolItem = {
  name: string;
  url: string;
  path: string;
  html_url?: string;
  repository: Repository;
};

export type ToolsData = Array<ToolItem>;

// Tools list types
type ToolsList<T> = {
  [key: string]: {
    description: string;
    toolsList: T[];
  };
};

export type ToolsListObject = ToolsList<AsyncAPITool>;
export type FinalToolsListObject = ToolsList<FinalAsyncAPITool>;
