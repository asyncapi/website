import type { Details } from './build-posts-list';

export type NavTreeItem = {
  item: Details;
  // eslint-disable-next-line no-use-before-define
  children?: RecursiveChildren | Array<Details>;
};
export type RecursiveChildren = { [key: string]: NavTreeItem };

export type NavTree = {
  [key: string]: NavTreeItem | Details;
};
