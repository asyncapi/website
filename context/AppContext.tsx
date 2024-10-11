import { createContext } from 'react';

import type { AppContextType } from '@/types/context/AppContext';

export default createContext<AppContextType>({ path: '' });
