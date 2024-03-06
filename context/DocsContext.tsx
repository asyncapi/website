import { createContext } from 'react';
import { DocsContextType } from '@/types/context/DocsContext';

const initialDocsContext: DocsContextType = {
  post: [],
  navItems: {}
};

export default createContext<DocsContextType>(initialDocsContext);
