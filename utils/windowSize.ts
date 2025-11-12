import { useEffect, useState } from "react";

export interface WindowSize {
  width: number;
  height: number;
}

// Tracks window size
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleReSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleReSize();
    window.addEventListener('resize', handleReSize);
    return () => window.removeEventListener('resize', handleReSize);
  }, []);

  return windowSize;
};