import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

/**
 * @description Hook to detect clicks outside a specified element.
 * @param {function} callback - The callback function to be called when a click outside the element is detected.
 */
export function useOutsideClick(callback: (e: MouseEvent) => void): RefObject<HTMLDivElement> {
  const callbackRef = useRef<((e: MouseEvent) => void) | null>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    /**
     * @description Handles the click event outside the specified element.
     * @param {MouseEvent} e - The click event.
     */
    function handleClick(e: MouseEvent) {
      if (innerRef.current && callbackRef.current && !innerRef.current.contains(e.target as Node)) {
        callbackRef.current(e);
      }
    }

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [innerRef]);

  return innerRef;
}
