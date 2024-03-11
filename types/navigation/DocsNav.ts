export interface Bucket {
    name?: string;
    title?: string;
    description?: string;
    link?: string;
    className?: string;
    borderClassName?: string;
    Icon?: React.ComponentType<any>;
    href?: string;
    icon?: React.ComponentType<any> | null;
}

export interface SerializedBuckets {
    [key: string]: Bucket;
}

export interface DocsNavProps {
    item: {
        children: {
            [key: string]: any;
        };
        item: {
            rootSectionId: string;
            slug: string;
            title: string;
        };
    };
    active: string;
    onClick?: () => void;
}