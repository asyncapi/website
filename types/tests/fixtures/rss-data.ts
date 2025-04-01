export interface BlogPost {
  title?: string;
  slug: string;
  excerpt: string;
  date?: string;
  featured: boolean;
  cover?: string;
}

export interface RssMockData {
  blog: BlogPost[];
}
