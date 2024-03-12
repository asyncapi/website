import { createContext } from 'react';
import { DocsContextType } from '@/types/context/DocsContext';

const initialPost = {
  title: "",
  weight: 0,
  toc: [],
  readingTime: 0,
  excerpt: "",
  sectionSlug: "",
  sectionWeight: 0,
  id: "",
  isIndex: true,
  slug: ""
};

const initialDocsContext: DocsContextType = {
  post: initialPost,
  navItems: {},
};

export default createContext<DocsContextType>(initialDocsContext);
