export interface NavItem {
    title: string;
    weight: number;
    isRootSection?: boolean;
    isSection: boolean;
    rootSectionId: string;
    sectionId?: string;
    sectionWeight?: number;
    slug: string;
    parent?: string;
    isPrerelease?: boolean;
}
