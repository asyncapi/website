export interface Post {
    title: string;
    slug?: string;
    excerpt?: string;
    cover?: string;
    toc?: { id: string; title: string }[];
    sectionTitle?: string;
    releaseNoteLink?: string;
}
  
export interface NavigationItem {
    title: string;
}
  
export interface NavigationItems {
    [key: string]: NavigationItem;
}
  
export interface DocsContextType {
    post: Post;
    navItems: NavigationItems;
}