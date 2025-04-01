export interface Tool {
  title: string;
  filters: {
    language?: string | string[];
    technology?: string | string[];
    categories?: string[];
    hasCommercial?: boolean;
  };
  links: {
    repoUrl?: string;
  };
}

export interface ToolsCategory {
  description?: string;
  toolsList: Tool[];
}

export interface ToolsData {
  [category: string]: ToolsCategory;
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

export interface ExpectedData {
  languages: Language[];
  technologies: Technology[];
}
