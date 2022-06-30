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