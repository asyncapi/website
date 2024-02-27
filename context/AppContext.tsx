import { createContext } from 'react';

interface AppContextType {
    path: string;
}

export default createContext<AppContextType>({ path: "" });
