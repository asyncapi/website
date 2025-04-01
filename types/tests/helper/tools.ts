export interface ToolRepositoryData {
  name: string;
  url: string;
  repository: {
    full_name: string;
    html_url: string;
    owner: { login: string };
    description?: string;
  };
  path: string;
  description?: string;
  repoName?: string;
  owner?: string;
  refId?: string;
}

export interface ToolFileContent {
  title: string;
  description: string;
  repoUrl?: string | null;
  categories?: string[];
  hasCommercial?: boolean;
  additionalLinks?: {}
  additionalFilters?: {};
  isAsyncAPIOwner?: boolean;
  links: {
    repoUrl: string | null;
    [key: string]: any;
  };
  filters: {
    categories: string[];
    hasCommercial: boolean;
    [key: string]: any;
  };

}

export interface ExpectedToolObject extends ToolFileContent {}

export interface MockData {
  items: ToolRepositoryData[];
}

export interface MalformedYAML {
  title: string;
  description: string;
  repoUrl: string;
}
