// src/types/markdown-toc.d.ts

declare module 'markdown-toc' {
  interface TocItem {
    content: string;
    slug: string;
    lvl: number;
    i: number;
  }

  interface TocResult {
    json: TocItem[];
    content: string;
    highest: number;
    tokens: any[];
  }

  interface TocOptions {
    firsth1?: boolean;
    maxdepth?: number;
    slugify?: (str: string) => string;
  }

  function toc(markdown: string, options?: TocOptions): TocResult;

  export = toc;
}
