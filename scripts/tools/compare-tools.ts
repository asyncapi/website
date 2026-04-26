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
 *
 * This is used by `tools-object.ts::convertTools` and
 * `combine-tools.ts::combineTools` to ensure `config/tools-automated.json`
 * and `config/tools.json` are byte-stable across regeneration runs — which
 * is what makes the weekly `chore: update tools.json` PR close automatically
 * as a no-op when nothing has actually changed upstream.
 *
 * See docs/tools-workflow-no-op-pr-fix.md for the full rationale.
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
