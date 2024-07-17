import { createContext } from 'react';

import type { IBlog } from '@/types/post';

export default createContext<{ post?: IBlog[number]; navItems?: IBlog }>({
  post: undefined,
  navItems: []
});
