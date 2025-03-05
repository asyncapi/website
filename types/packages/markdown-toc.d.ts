// src/types/markdown-toc.d.ts

declare module 'markdown-toc' {
  interface TocItem {
    content: string;
    slug: string;
    lvl: number;
    i: number;
  }

  interface MarkdownToken {
    type: string;
    level: number;

    // Optional properties for headings
    hLevel?: number;

    // Optional properties for inline content
    content?: string;
    lines?: [number, number][];

    // Optional properties for nested tokens
    children?: MarkdownToken[];

    // Optional properties for inline tokens
    lvl?: number;
    i?: number;
    seen?: number;
  }
  interface TocResult {
    json: TocItem[];
    content: string;
    highest: number;
    tokens: MarkdownToken[];
  }

  interface TocOptions {
    firsth1?: boolean;
    maxdepth?: number;
    slugify?: (str: string) => string;
  }

  function toc(markdown: string, options?: TocOptions): TocResult;

  export = toc;
}
