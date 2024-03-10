export interface MenuItem {
    title: string;
    href: string;
    description: string;
    icon: React.ElementType;
    className?: string;
    comingSoon?: boolean;
    beta?: boolean;
}

export interface MenuBlocksProps {
    items?: MenuItem[];
}