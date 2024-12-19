interface Links {
  websiteUrl?: string; // URL to the website where your project hosts some demo or project landing page.
  docsUrl?: string; // URL to project documentation.
  repoUrl?: string; // URL to project codebase.
}

type Language =
  | 'Go'
  | 'Java'
  | 'JavaScript'
  | 'HTML'
  | 'C/C++'
  | 'C#'
  | 'Python'
  | 'TypeScript'
  | 'Kotlin'
  | 'Scala'
  | 'Markdown'
  | 'YAML'
  | 'R'
  | 'Ruby'
  | 'Rust'
  | 'Shell'
  | 'Groovy';

type Technology =
  | 'Node js'
  | 'Hermes'
  | 'React JS'
  | '.NET'
  | 'ASP.NET'
  | 'Springboot'
  | 'AWS'
  | 'Docker'
  | 'Node-red'
  | 'Maven'
  | 'Saas'
  | 'Kubernetes-native'
  | 'Scala'
  | 'Azure'
  | 'Jenkins'
  | 'Flask';

type Category =
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

interface Filters {
  language?: Language | string | Array<Language | string>; // Language referred to is the runtime language selected by the user.
  technology?: Array<Technology | string>; // List of different technologies used in the tool.
  categories: Array<Category | string>; // Categories are used to group tools by different use cases.
  hasCommercial?: boolean; // Indicate if your tool is open source or commercial offering.
}
// Note: this definition is implemented from the schema located at scripts/tools/tools-schema.json

export interface AsyncAPITool {
  title: string; // Human-readable name of the tool.
  description?: string; // Custom description to override repository description.
  links?: Links; // Links to website, documentation, and repository.
  filters: Filters; // Filter properties.
}

export type ToolsData = {
  items: {
    name: string;
    url: string;
    path: string;
    html_url: string;
    repository: {
      full_name: string;
      html_url: string;
      owner: {
        login: string;
      };
      description: string;
    };
  }[];
};

export type ToolsListObject = {
  [key: string]: {
    description: string;
    toolsList: AsyncAPITool[];
  };
};
