export interface DocItem {
  title: string;
  slug: string;
}

export interface DocNode {
  item: DocItem;
  children?: Record<string, DocNode>;
}
