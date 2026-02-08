import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import type { IDocs } from '@/types/post';

interface IDocsNavigationShortcutsProps {
  post: IDocs[number];
}

const INTERACTIVE_TAGS = new Set(['input', 'textarea', 'select', 'button']);

export default function DocsNavigationShortcuts({ post }: IDocsNavigationShortcutsProps) {
  const router = useRouter();

  const navigationTargets = useMemo(
    () => ({
      prev: post?.prevPage?.href,
      next: post?.nextPage?.href,
    }),
    [post?.prevPage?.href, post?.nextPage?.href],
  );

  useEffect(() => {
    if (!navigationTargets.prev && !navigationTargets.next) {
      return undefined;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName?.toLowerCase();
      const isEditable = target?.isContentEditable;

      if (isEditable || (tagName && INTERACTIVE_TAGS.has(tagName))) return;

      if (event.key === 'ArrowLeft' && navigationTargets.prev) {
        router.push(navigationTargets.prev);
        event.preventDefault();
      } else if (event.key === 'ArrowRight' && navigationTargets.next) {
        router.push(navigationTargets.next);
        event.preventDefault();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigationTargets, router]);

  // This component only handles keyboard shortcuts
  // UI navigation buttons are handled by DocsButton component at the bottom
  return null;
}
