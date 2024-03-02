import { createContext } from 'react';
import { AppContextType } from '@/types/context/AppContext';

export default createContext<AppContextType>({ path: "" });
