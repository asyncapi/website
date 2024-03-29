import { createContext } from 'react';

import type { DocsContextType } from '@/types/context/DocsContext';

export default createContext<DocsContextType>({
  post: {
    title: '',
    weight: 0,
    toc: [],
    readingTime: 0,
    excerpt: '',
    sectionSlug: '',
    sectionWeight: 0,
    id: '',
    isIndex: true,
    slug: ''
  },
  navItems: {}
});
