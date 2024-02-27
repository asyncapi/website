export interface BlogContextValue {
    post?: {
      title: string;
      toc: { title: string; id: string }[];
      authors: { name: string; link?: string }[];
      date: string;
      slug?: string;
      readingTime: number;
      excerpt: string;
      cover: string;
      coverCaption: string;
      canonical?: string;
    };
}