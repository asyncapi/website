import { IDocs } from "../post";
  
export interface NavigationItem {
    title: string;
}
  
export interface NavigationItems {
    [key: string]: NavigationItem;
}
  
export interface DocsContextType {
    post: IDocs;
    navItems: NavigationItems;
}