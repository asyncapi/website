import { createContext } from 'react';
import { DocsContextType } from '@/types/context/DocsContext';

const initialDocsContext: DocsContextType = {
  post: {
    title: '',
  },
  navItems: {},
};

export default createContext<DocsContextType>(initialDocsContext);
