export interface Tag {
    name: string;
    color: string;
    borderColor: string;
}

export interface TagsData {
    languages: Tag[];
    technologies: Tag[];
}

export interface ManualTool {
    title: string;
    description: string;
    links: {
        repoUrl: string;
    };
    filters: {
        categories: string[];
        language: string;
        technology: string[];
    };
}

export interface ConvertedData {
    [category: string]: {
        description: string;
        toolsList: ManualTool[];
    };
}

export interface ExtractData {
    items: ExtractItem[];
}

export interface ExtractItem {
    name: string;
    url: string;
    repository: {
        full_name: string;
        html_url: string;
        description: string;
        owner: {
            login: string;
        };
    };
    path: string;
}
