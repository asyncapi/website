import type { IDoc } from '../post';

export interface NavigationItem {
  title: string;
}

export interface NavigationItems {
  [key: string]: NavigationItem;
}

export interface DocsContextType {
  post: IDoc;
  navItems: NavigationItems;
}
