import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type SpecVersion = '2.x' | '3.x';

interface SpecVersionContextType {
  version: SpecVersion;
  setVersion: (version: SpecVersion) => void;
}

const SpecVersionContext = createContext<SpecVersionContextType | undefined>(undefined);

interface SpecVersionProviderProps {
  children: ReactNode;
}

export function SpecVersionProvider({ children }: SpecVersionProviderProps) {
  const [version, setVersion] = useState<SpecVersion>('2.x');
  
  // Debugging: Log to console to see state changes
  console.log(`SpecVersionProvider - initial version: ${version}`);

  // Load saved version from localStorage on mount
  useEffect(() => {
    try {
      const savedVersion = localStorage.getItem('asyncapi-spec-version') as SpecVersion;
      console.log(`SpecVersionProvider - loaded saved version: ${savedVersion}`);
      if (savedVersion === '2.x' || savedVersion === '3.x') {
        setVersion(savedVersion);
        console.log(`SpecVersionProvider - set version to saved: ${savedVersion}`);
      }
    } catch (error) {
      // Gracefully handle localStorage unavailability
      console.warn('Unable to access localStorage for spec version preference');
    }
  }, []);

  // Save version to localStorage when it changes
  const handleSetVersion = (newVersion: SpecVersion) => {
    console.log(`SpecVersionProvider - setting version to: ${newVersion}`);
    setVersion(newVersion);
    try {
      localStorage.setItem('asyncapi-spec-version', newVersion);
      console.log(`SpecVersionProvider - saved version to localStorage: ${newVersion}`);
    } catch (error) {
      console.warn('Unable to save spec version preference to localStorage');
    }
  };

  return (
    <SpecVersionContext.Provider value={{ version, setVersion: handleSetVersion }}>
      {children}
    </SpecVersionContext.Provider>
  );
}

export function useSpecVersion() {
  const context = useContext(SpecVersionContext);
  if (context === undefined) {
    throw new Error('useSpecVersion must be used within a SpecVersionProvider');
  }
  return context;
}