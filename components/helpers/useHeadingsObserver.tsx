import { useEffect, useRef, useState } from 'react';

/**
 * @description Custom hook to observe headings and set the current active heading
 * @example const { currActive } = useHeadingsObserver();
 * @returns {object} currActive - current active heading
 */
export function useHeadingsObserver() {
  const observer = useRef<IntersectionObserver | null>(null);
  const headingsRef = useRef<NodeListOf<HTMLElement> | []>([]);
  const [currActive, setCurrActive] = useState<string | null>(null);

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrActive(entry.target.id);
        }
      });
    };

    // The heading in from top 20% of the viewport to top 30% of the viewport will be considered as active
    observer.current = new IntersectionObserver(callback, {
      rootMargin: '-20% 0px -70% 0px'
    });

    headingsRef.current = document.querySelectorAll('h2, h3');
    headingsRef.current.forEach((heading) => {
      observer.current?.observe(heading);
    });

    return () => observer.current?.disconnect();
  }, []);

  return { currActive };
}
