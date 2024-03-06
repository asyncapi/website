import { createContext } from 'react';

import type { IBlogs } from '@/types/post';

export default createContext<{ post?: IBlogs[number], navItems?: IBlogs } | undefined>(undefined);
