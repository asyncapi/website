export interface DocsNavItemProps {
    title: string;
    slug: string;
    href?: string;
    activeSlug: string;
    sectionSlug?: string;
    onClick?: () => void;
    defaultClassName?: string;
    inactiveClassName?: string;
    activeClassName?: string;
    bucket?: {
        className: string;
        icon: React.ComponentType<any>;
    };
}