import { useRef, useEffect } from "react";

export function useOutsideClick(callback) {
  const callbackRef = useRef();
  const innerRef = useRef();

  useEffect(() => { callbackRef.current = callback; });
  
  useEffect(() => {
    function handleClick(e) {
      if (innerRef.current && callbackRef.current && 
        !innerRef.current.contains(e.target)
      ) callbackRef.current(e);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
      
  return innerRef;
}