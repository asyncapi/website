import { createContext } from 'react';

import type { IPosts } from '@/types/post';

export default createContext<{ post: IPosts['blog'][number] | IPosts['docs'][number] } | undefined>(undefined);
