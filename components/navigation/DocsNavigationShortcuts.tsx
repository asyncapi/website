import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import type { IDocs } from '@/types/post';

import ArrowLeft from '../icons/ArrowLeft';
import ArrowRight from '../icons/ArrowRight';

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
    if (!navigationTargets.prev && !navigationTargets.next) return;

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
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigationTargets, router]);

  if (!post?.prevPage && !post?.nextPage) return null;

  const buttonBaseStyles =
    'pointer-events-auto inline-flex max-w-xs items-center gap-2 rounded-full border border-gray-200 bg-white/90 px-3 py-2 text-sm font-medium text-gray-700 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500 hover:border-secondary-200 hover:text-secondary-600';

  return (
    <div className='pointer-events-none fixed inset-y-0 left-0 right-0 z-30 hidden md:flex md:items-center md:justify-between md:px-4 lg:px-8'>
      <div className='flex-1'>
        {post?.prevPage && (
          <Link
            href={post.prevPage.href}
            className={`${buttonBaseStyles} justify-start`}
            aria-label={`Previous documentation page: ${post.prevPage.title}`}
          >
            <ArrowLeft className='size-4' />
            <span className='hidden lg:inline'>{post.prevPage.title}</span>
            <span className='lg:hidden'>Previous</span>
          </Link>
        )}
      </div>
      <div className='flex-1 text-right'>
        {post?.nextPage && (
          <Link
            href={post.nextPage.href}
            className={`${buttonBaseStyles} justify-end`}
            aria-label={`Next documentation page: ${post.nextPage.title}`}
          >
            <span className='hidden lg:inline'>{post.nextPage.title}</span>
            <span className='lg:hidden'>Next</span>
            <ArrowRight className='size-4' />
          </Link>
        )}
      </div>
    </div>
  );
}
