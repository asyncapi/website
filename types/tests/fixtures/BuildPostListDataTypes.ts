export interface ContentItem {
    dir: string;
    file: string;
    content: string;
    subDir?: string;
}

export interface TestContent {
    blog: ContentItem;
    docs: ContentItem;
    about: ContentItem;
}
