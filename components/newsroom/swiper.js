import { useState, useRef, useEffect } from 'react'

export function useSwiperRef() {
  const [wrapper, setWrapper] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    setWrapper(ref.current);
  }, []);

  return [
    wrapper,
    ref,
  ]
};

export function checkLastSnapIndex(current) {
  if (typeof window === "undefined") {
    return false;
  }

  const viewportWidth = document.documentElement.clientWidth;
  if (viewportWidth <= 640) {
    return current === 4;
  }
  return current === 3;
}