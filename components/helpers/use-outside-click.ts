import { useRef, useEffect, RefObject } from "react";

export function useOutsideClick(callback: (e: MouseEvent) => void): RefObject<HTMLDivElement> {
  const callbackRef = useRef<((e: MouseEvent) => void) | null>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { callbackRef.current = callback; }, [callback]);
  
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (innerRef.current && callbackRef.current && 
        !innerRef.current.contains(e.target as Node)
      ) callbackRef.current(e);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [innerRef]);
      
  return innerRef;
}
