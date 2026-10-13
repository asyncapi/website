import type { AsyncAPITool, FinalAsyncAPITool } from '@/types/scripts/tools';

/**
 * Deterministic comparator for ordering tools inside a category's `toolsList`.
 *
 * Primary key: `title` with case-insensitive locale compare so variants like
 * "AsyncAPI.Net" and "AsyncAPI.NET" are treated as equal on the primary axis.
 * Tie-breaker 1: `title` with full locale compare (so Net < NET remains a
 * stable order when titles are otherwise identical).
 * Tie-breaker 2: `links.repoUrl` (globally unique per .asyncapi-tool file),
 * making the order fully deterministic even for duplicate-title tools.
 *
 * Missing titles or repoUrls are normalised to `""` and always sort first.
 */
export function compareToolsDeterministic(
  a: AsyncAPITool | FinalAsyncAPITool | undefined | null,
  b: AsyncAPITool | FinalAsyncAPITool | undefined | null
): number {
  const titleA = a?.title ?? '';
  const titleB = b?.title ?? '';

  const basePrimary = titleA.localeCompare(titleB, 'en', { sensitivity: 'base' });

  if (basePrimary !== 0) return basePrimary;

  const fullPrimary = titleA.localeCompare(titleB, 'en');

  if (fullPrimary !== 0) return fullPrimary;

  const repoA = a?.links?.repoUrl ?? '';
  const repoB = b?.links?.repoUrl ?? '';

  if (repoA < repoB) return -1;
  if (repoA > repoB) return 1;

  return 0;
}
