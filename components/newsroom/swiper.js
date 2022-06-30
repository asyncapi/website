import { useState, useRef, useEffect } from 'react'

import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/navigation';

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