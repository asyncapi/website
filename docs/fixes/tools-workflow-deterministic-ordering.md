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

After merging automated and manual tools, `combineTools` sorted them using a simple `title.localeCompare(anotherTitle)`. This is insufficient when two tools share the same title (common with forks): `localeCompare` returns `0`, so their relative order is left as-is — whatever order they happened to arrive in from the concurrent API fetches, which varies between runs.

### 3. Language/technology discovery order (`combine-tools.ts`)

When a tool references a language or technology not already in the initial list from `tags-color.ts`, a new `LanguageColorItem` is appended to the global `languageList` / `technologyList` arrays. The order of these appends depends on which tool's Fuse search runs first inside the `Promise.all`, making the tail of `all-tags.json` non-deterministic.

## Solution

### Tool ordering (`scripts/tools/compare-tools.ts`)

A comparator (`compareToolsDeterministic`) sorts tools alphabetically by title. When two tools have the same title (e.g. forks), `repoUrl` is used as a tiebreaker, making every tool's position unique and stable. This comparator is applied in both `tools-object.ts` (after fetching) and `combine-tools.ts` (after merging automated and manual tools).

### Language / technology ordering (`scripts/tools/combine-tools.ts`)

A helper (`sortColorItems`) keeps the hand-curated items from `tags-color.ts` in their original order, and sorts any newly discovered items alphabetically after them. The boundary between curated and discovered is captured once at startup, before any tools are processed.


## Expected Outcome

After these changes:

- If the upstream set of tools has **not changed**, running `npm run generate:tools` produces byte-identical `config/tools-automated.json`, `config/tools.json`, and `config/all-tags.json`. The `peter-evans/create-pull-request` action will detect no diff and skip PR creation.
- If the upstream set **has changed** (new tool, removed tool, updated description), the diff in the PR will contain **only the actual changes**, not reordering noise.
- Maintainer review is focused on real content changes, reducing the weekly review burden.

## Pipeline Overview

```text
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
       │                sorts language/technology lists
       │
       ├──▶ config/tools.json      (final combined output)
       └──▶ config/all-tags.json   (sorted language/technology lists)
```
