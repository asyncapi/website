import type React from 'react';
import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to manage swiper reference.
 * @description This hook returns a tuple containing the wrapper element and a ref object.
 */
export function useSwiperRef(): [HTMLButtonElement | null, React.RefObject<HTMLButtonElement>] {
  const [wrapper, setWrapper] = useState<HTMLButtonElement | null>(null);
  const ref = useRef<HTMLButtonElement>(null);

  // useEffect hook to set the wrapper element to the ref's current value once it's available.
  useEffect(() => {
    if (ref.current) {
      setWrapper(ref.current);
    }
  }, []);

  return [wrapper, ref];
}

/**
 * Function to check if the current index is the last snap index based on the viewport width.
 * @param {number} current - The current index.
 * @returns {boolean} Whether the current index is the last snap index.
 */
export function checkLastSnapIndex(current: number): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const viewportWidth = document.documentElement.clientWidth;

  if (viewportWidth <= 640) {
    return current === 4;
  }

  return current === 3;
}
