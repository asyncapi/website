export interface IPost {
  title: string;
  isSection: boolean;
  weight: number;
  toc: {
    content: string;
    slug: string;
    lvl: number;
    i: number;
    seen: number;
  }[];
  readingTime: number;
  excerpt: string;
  sectionSlug: string;
  sectionWeight: number;
  id: string;
  isIndex: boolean;
  slug: string;
}

export interface Posts {
  [key: string]: IPost[];
}
