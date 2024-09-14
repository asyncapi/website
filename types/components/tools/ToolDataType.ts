export interface Link {
  repoUrl?: string;
  websiteUrl?: string;
  docsUrl?: string;
}

export interface Language {
  name: string;
  color: string;
  borderColor: string;
}

export interface Technology {
  name: string;
  color: string;
  borderColor: string;
}

export interface Category {
  name: string;
  tag: string;
  description: string;
}

export interface Filter {
  categories: string[];
  hasCommercial?: boolean;
  isAsyncAPIOwner?: boolean;
  language?: { name: string; color: string; borderColor: string }[];
  technology?: { name: string; color: string; borderColor: string }[];
}

export interface ToolData {
  title: string;
  description?: string;
  links?: Link;
  filters: Filter;
}

export interface ToolsListData {
  [category: string]: {
    description: string;
    toolsList: ToolData[];
    elementRef?: React.RefObject<any>;
  };
}

export interface VisibleDataListType {
  lang?: boolean;
  tech?: boolean;
  desc?: boolean;
  category?: boolean;
  pricing?: boolean;
  ownership?: boolean;
}
