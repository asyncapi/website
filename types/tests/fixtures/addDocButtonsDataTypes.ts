export interface DocPost {
    title: string;
    slug: string;
    content: string;
}

export interface TreePostItem {
    title: string;
    isRootSection?: boolean;
    isRootElement?: boolean;
    slug?: string;
}

export interface TreePostNode {
    item: TreePostItem;
    children?: Record<string, TreePostNode>;
}

export type TreePost = Record<string, TreePostNode>;

export interface MockDocPost {
    slug: string;
    title: string;
}

export interface MockTreePostNode {
    item: TreePostItem;
    children?: Record<string, MockTreePostNode>;
}

export type MockTreePost = Record<string, MockTreePostNode>;
