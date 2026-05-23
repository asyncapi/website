# Deterministic Ordering in the Tools Workflow

## Background

The AsyncAPI website has an automated weekly workflow (`.github/workflows/regenerate-tools.yml`) that:

1. Fetches tool definitions (`.asyncapi-tool` files) from GitHub repositories via the GitHub Search API.
2. Converts and categorises them into `config/tools-automated.json`.
3. Merges automated tools with manually curated tools (`config/tools-manual.json`) into `config/tools.json`.
4. Writes the combined language/technology tag list to `config/all-tags.json`.
5. Opens a PR titled **"chore: update tools.json"** for maintainer review.

Previously, PRs were auto-approved by a bot. A manual approval step was introduced as a safety measure to prevent potentially abusive or incorrect content from being merged without human review. While reviewing these PRs, maintainers noticed cases (e.g. [#5321](https://github.com/asyncapi/website/pull/5321)) where the diff contained **only reordering changes with no actual content difference**. This added unnecessary review burden, especially when reordering was mixed with legitimate updates (new tools, description changes, etc.).

## Root Cause

Three independent sources of non-determinism caused tool/tag ordering to vary between runs even when the underlying data was identical:

### 1. GitHub API response order (`tools-object.ts`)

`convertTools` fetches each `.asyncapi-tool` file via `axios.get` inside a `Promise.all`. The order in which HTTP responses resolve depends on network conditions and GitHub API load, so tools were pushed into each category's `toolsList` in an unpredictable order.

### 2. Combined tools sort (`combine-tools.ts`)

After merging automated and manual tools, `combineTools` sorted them using a simple `title.localeCompare(anotherTitle)`. This is insufficient when two tools share the same title (common with forks), because `localeCompare` returns `0` and `Array.prototype.sort` is not guaranteed to be stable across engines or runs.

### 3. Language/technology discovery order (`combine-tools.ts`)

When a tool references a language or technology not already in the initial list from `tags-color.ts`, a new `LanguageColorItem` is appended to the global `languageList` / `technologyList` arrays. The order of these appends depends on which tool's Fuse search runs first inside the `Promise.all`, making the tail of `all-tags.json` non-deterministic.

## Solution

### `compareToolsDeterministic` (new file: `scripts/tools/compare-tools.ts`)

A dedicated comparator function with a three-tier sort key:

| Priority | Key | Method | Purpose |
|----------|-----|--------|---------|
| 1 (primary) | `title` | `localeCompare(…, 'en', { sensitivity: 'base' })` | Case-insensitive alphabetical ordering — groups variants like "AsyncAPI.Net" and "AsyncAPI.NET" together. |
| 2 (tie-breaker) | `title` | `localeCompare(…, 'en')` | Full case-sensitive compare to establish a stable order among case variants. |
| 3 (tie-breaker) | `links.repoUrl` | Lexicographic (`<` / `>`) | Globally unique per `.asyncapi-tool` file, guarantees full determinism even for tools with identical titles. |

Missing titles or repoUrls are normalised to `""` and sort first. `null` / `undefined` tool objects are handled gracefully.

### Sort applied in `convertTools` (`scripts/tools/tools-object.ts`)

After all `Promise.all` calls complete (tools fetched and categorised), each category's `toolsList` is sorted in-place using `compareToolsDeterministic`:

```typescript
for (const category of Object.keys(finalToolsObject)) {
  finalToolsObject[category].toolsList.sort(compareToolsDeterministic);
}
```

This makes `config/tools-automated.json` byte-stable.

### Sort applied in `combineTools` (`scripts/tools/combine-tools.ts`)

The combined (automated + manual) tools list now uses `compareToolsDeterministic` instead of the previous bare `localeCompare`:

```typescript
finalTools[key].toolsList = [...automatedResults, ...manualResults]
  .sort((tool, anotherTool) => {
    if (!tool?.title || !anotherTool?.title) {
      // error logging...
      return 0;
    }
    return compareToolsDeterministic(tool, anotherTool);
  }) as FinalAsyncAPITool[];
```

This makes `config/tools.json` byte-stable.

### Color item list sorting (`sortColorItems` in `combine-tools.ts`)

A new helper function `sortColorItems` ensures `config/all-tags.json` is deterministic:

1. **Initial items** (from `scripts/tools/tags-color.ts`) keep their original, curated order.
2. **Discovered items** (appended during the run) are:
   - Deduplicated by `name` against both the initial set and each other.
   - Sorted alphabetically by `name` using `localeCompare(…, 'en')`.

The initial counts are captured at module load time (`initialLanguageCount`, `initialTechnologyCount`) before any tools are processed:

```typescript
const initialLanguageCount = languageList.length;
const initialTechnologyCount = technologyList.length;
```

When writing `all-tags.json`, the sorted lists are used:

```typescript
fs.writeFileSync(tagsPath, JSON.stringify({
  languages: sortColorItems(languageList, initialLanguageCount),
  technologies: sortColorItems(technologyList, initialTechnologyCount)
}, null, 2));
```

## Files Changed

| File | Change |
|------|--------|
| `scripts/tools/compare-tools.ts` | **New.** Deterministic comparator function. |
| `scripts/tools/tools-object.ts` | Added post-`Promise.all` sort using `compareToolsDeterministic`. |
| `scripts/tools/combine-tools.ts` | Replaced bare `localeCompare` with `compareToolsDeterministic`; added `sortColorItems` for language/technology list ordering; captured initial count constants. |
| `tests/tools/compare-tools.test.ts` | **New.** Unit tests for the comparator (alphabetical, case tie-breaking, repoUrl tie-breaking, input-order independence, null safety). |
| `tests/tools/tools-object.test.ts` | Added test proving deterministic output regardless of `axios.get` resolution order. |
| `tests/tools/combine-tools.test.ts` | Added test for deterministic `all-tags.json` ordering; added test for missing-title error logging during sort. |
| `config/tools.json` | One-time reorder to the new stable ordering. |
| `config/all-tags.json` | One-time reorder to the new stable ordering. |

## Test Coverage

All sorting-related scenarios are covered:

- **`compare-tools.test.ts`**: Alphabetical ordering, case-insensitive grouping, case-sensitive tie-breaking, repoUrl tie-breaking, input-order independence (same set sorted from three different orderings yields identical output), and null/undefined safety.
- **`tools-object.test.ts`**: Simulates different network timing by varying `setTimeout` delays on `axios.get` responses across two runs, then asserts the output is byte-identical.
- **`combine-tools.test.ts`**: Verifies that newly discovered language/technology tags are sorted alphabetically in the tail of the list while seed tags retain their curated order.

Run these tests with:

```bash
npx jest --testPathPattern='tests/tools/(combine-tools|compare-tools|tools-object)' --no-coverage
```

## Expected Outcome

After these changes:

- If the upstream set of tools has **not changed**, running `npm run generate:tools` produces byte-identical `config/tools-automated.json`, `config/tools.json`, and `config/all-tags.json`. The `peter-evans/create-pull-request` action will detect no diff and skip PR creation.
- If the upstream set **has changed** (new tool, removed tool, updated description), the diff in the PR will contain **only the actual changes**, not reordering noise.
- Maintainer review is focused on real content changes, reducing the weekly review burden.

## Pipeline Overview

```
GitHub Search API
       │
       ▼
 getData() ─── fetches .asyncapi-tool files
       │
       ▼
 convertTools() ─── validates, categorises, sorts (deterministic)
       │
       ▼
 config/tools-automated.json  (written to disk)
       │
       ▼
 combineTools() ─── merges with config/tools-manual.json
       │                applies ignore rules from config/tools-ignore.json
       │                sorts combined list (deterministic)
       │                sorts tag lists
       │
       ├──▶ config/tools.json      (final combined output)
       └──▶ config/all-tags.json   (sorted tag lists)
```
