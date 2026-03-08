# Tools Ignore System -- Design Document

## Table of Contents

1. [Problem Statement](#problem-statement)
2. [Architecture Overview](#architecture-overview)
3. [Data Flow](#data-flow)
4. [File Map](#file-map)
5. [Schema Design](#schema-design)
   - [tools-ignore.json](#tools-ignorejson)
   - [tools-ignored.json (Audit Log)](#tools-ignoredjson-audit-log)
6. [Matching Algorithm](#matching-algorithm)
   - [Ignore Variations](#ignore-variations)
   - [Decision Flowchart](#decision-flowchart)
7. [Usage Guide](#usage-guide)
   - [Variation 1: Ignore by Title](#variation-1-ignore-by-title-all-categories)
   - [Variation 2: Ignore by repoUrl (Quick Remove)](#variation-2-ignore-by-repourl-quick-remove)
   - [Variation 3: Ignore by Title + repoUrl (Specific Fork)](#variation-3-ignore-by-title--repourl-specific-fork)
   - [Variation 4: Ignore by Title with Category Scope](#variation-4-ignore-by-title-with-category-scope)
   - [Variation 5: Ignore by repoUrl with Category Scope](#variation-5-ignore-by-repourl-with-category-scope)
   - [Variation 6: Ignore by Title + repoUrl + Category Scope](#variation-6-ignore-by-title--repourl--category-scope)
8. [Why This Design?](#why-this-design)

---

## Problem Statement

The AsyncAPI website displays a curated list of community tools. These tools are gathered from two sources:

1. **Automated** -- A GitHub Actions workflow runs on a schedule, fetches tool metadata via the GitHub API, and writes `tools-automated.json`.
2. **Manual** -- Maintainers hand-curate entries in `tools-manual.json`.

A combine script merges both sources into a single `tools.json` that the website reads.

**The problem:** Everything fetched from the GitHub API is included without any filtering. If a fork, a deprecated project, or a spam entry appears in the automated data, there is no mechanism to exclude it from the final output. The tools-ignore system solves this by introducing a declarative ignore list that filters out unwanted entries during the combine step.

---

## Architecture Overview

```
                     GitHub API
                         |
                         v
             +-------------------------+
             | extract-tools-github.ts |  (fetch .asyncapi-tool files)
             +-------------------------+
                         |
                         v
              +--------------------+
              |  tools-object.ts   |  (convert to standard format)
              +--------------------+
                         |
                         v
            +------------------------+
            | tools-automated.json   |  (raw automated tools)
            +------------------------+
                         |
    +--------------------+--------------------+
    |                                         |
    v                                         v
+---------------------+            +---------------------+
| tools-manual.json   |            | tools-ignore.json   |  <-- NEW
+---------------------+            +---------------------+
    |                                         |
    +---------+         +---------------------+
              |         |
              v         v
      +-------------------------+
      |   combine-tools.ts      |  (merge + filter)
      +-------------------------+
              |              |
              v              v
    +-------------+   +------------------+
    | tools.json  |   | tools-ignored.json|  <-- NEW (audit log)
    +-------------+   +------------------+
              |
              v
        Website UI
```

The new `tools-ignore.json` file sits alongside the existing config files and is read during the combine step. Any tool matching an ignore rule is filtered out **before** merging. A companion `tools-ignored.json` audit log is written to record exactly what was filtered and why.

---

## Data Flow

Here is the step-by-step flow when `npm run generate:tools` executes:

```
1. build-tools.ts is invoked
       |
2. getData() fetches .asyncapi-tool files from GitHub repos
       |
3. convertTools() normalizes the raw data into ToolsListObject format
       |
4. Result is written to config/tools-automated.json
       |
5. config/tools-manual.json is read from disk
       |
6. config/tools-ignore.json is read from disk (if it exists)
       |
7. combineTools() is called with all three inputs
       |
       +---> For each category:
       |       |
       |       +---> Filter automated tools against the ignore list
       |       |         (shouldIgnoreTool() called per tool)
       |       |         Ignored tools are recorded in the audit array
       |       |
       |       +---> Process kept automated tools (getFinalTool)
       |       |         - Match language/technology tags
       |       |         - Assign display colors
       |       |
       |       +---> Filter manual tools against the ignore list
       |       |         (shouldIgnoreTool() called per tool)
       |       |         Ignored tools are recorded in the audit array
       |       |
       |       +---> Validate & process kept manual tools
       |       |         - JSON schema validation (Ajv)
       |       |         - getFinalTool processing
       |       |
       |       +---> Merge automated + manual results
       |       |
       |       +---> Sort alphabetically by title
       |
8. Write config/tools.json (combined output)
       |
9. Write config/all-tags.json (language + technology tags)
       |
10. Write config/tools-ignored.json (audit log of what was filtered)
       |
11. Log ignored tools summary to stdout (visible in workflow logs)
```

---

## File Map

| File | Role | Committed to Git? |
|------|------|:-:|
| `config/tools-automated.json` | Raw automated tools from GitHub API | Yes |
| `config/tools-manual.json` | Hand-curated manual tool entries | Yes |
| `config/tools-ignore.json` | Declarative ignore rules | Yes |
| `config/tools.json` | Final combined output for the website | Yes |
| `config/all-tags.json` | Aggregated language/technology tags | Yes |
| `config/tools-ignored.json` | Auto-generated audit log | No (.gitignore) |
| `scripts/build-tools.ts` | Orchestrator / entry point | Yes |
| `scripts/tools/combine-tools.ts` | Core merge + filter logic | Yes |
| `types/scripts/tools.ts` | TypeScript type definitions | Yes |
| `tests/tools/combine-tools.test.ts` | Unit tests | Yes |
| `tests/fixtures/combineToolsData.ts` | Test fixture data | Yes |

---

## Schema Design

### tools-ignore.json

Located at `config/tools-ignore.json`. This is the file maintainers edit to control which tools are excluded.

```json
{
  "description": "Human-readable description of this file's purpose.",
  "tools": [
    {
      "title": "Tool Name",
      "repoUrl": "https://github.com/owner/repo",
      "reason": "Why this tool is being ignored",
      "categories": ["Editors", "CLIs"]
    }
  ]
}
```

**Field reference:**

| Field | Type | Required | Description |
|-------|------|:--------:|-------------|
| `title` | `string` | No* | Exact title of the tool to match. |
| `repoUrl` | `string` | No* | Repository URL to match. When used alone, all tools with this repo are ignored regardless of title. |
| `reason` | `string` | Yes | Documents why this tool is being excluded. Appears in the audit log. |
| `categories` | `string[]` | No | When provided, the tool is only removed from these specific categories. When omitted, the tool is removed from **all** categories it appears in. Values must match category names exactly (e.g., `"Editors"`, `"Code-first tools"`, `"AsyncAPI Generator Templates"`). |

> *At least one of `title` or `repoUrl` must be provided. Entries with neither are skipped.

### tools-ignored.json (Audit Log)

Auto-generated at `config/tools-ignored.json` on every combine run. This file is in `.gitignore` and serves as a local verification artifact.

```json
{
  "description": "Auto-generated audit log of tools ignored during the last combine run.",
  "generatedAt": "2026-02-22T10:27:48.978Z",
  "totalIgnored": 7,
  "ignoredTools": [
    {
      "title": "SIO-AsyncAPI",
      "repoUrl": "https://github.com/daler-rahimov/sio-asyncapi",
      "reason": "Deprecated tool",
      "category": "APIs",
      "source": "automated",
      "ignoredAt": "2026-02-22T10:27:48.922Z"
    }
  ]
}
```

**Field reference for each entry in `ignoredTools`:**

| Field | Description |
|-------|-------------|
| `title` | Title of the tool that was ignored. |
| `repoUrl` | The tool's repository URL (for identification). |
| `reason` | The reason string from the matching ignore rule. |
| `category` | Which category this specific removal happened in. |
| `source` | Whether the tool came from `"automated"` or `"manual"` data. |
| `ignoredAt` | ISO 8601 timestamp of when the ignore was applied. |

A single ignore rule can produce multiple audit records if the tool appears in several categories.

---

## Matching Algorithm

### Ignore Variations

The system supports six distinct ignore strategies, each providing a different level of precision:

| # | Strategy | Fields Used | What Gets Removed |
|---|----------|-------------|-------------------|
| 1 | Title only | `title` | All tools with that title, in all categories |
| 2 | repoUrl only | `repoUrl` | All tools with that repo, in all categories (quick remove) |
| 3 | Title + repoUrl | `title`, `repoUrl` | Only the exact title+repo combination, in all categories |
| 4 | Title + categories | `title`, `categories` | All tools with that title, but only in the listed categories |
| 5 | repoUrl + categories | `repoUrl`, `categories` | All tools with that repo, but only in the listed categories |
| 6 | Title + repoUrl + categories | `title`, `repoUrl`, `categories` | Only the exact title+repo combination, only in the listed categories |

### Decision Flowchart

For each tool in each category, the `shouldIgnoreTool()` function evaluates every entry in the ignore list:

```
For each ignore entry:
  |
  +---> Does the entry have at least `title` or `repoUrl`?
  |       |
  |       No --> SKIP (invalid entry)
  |       |
  |       Yes --> continue
  |
  +---> Does the entry have `categories`?
  |       |
  |       Yes --> Is the current category in that list?
  |       |        |
  |       |        No --> SKIP this entry, move to next
  |       |        |
  |       |        Yes --> continue
  |       |
  |       No --> continue (applies to all categories)
  |
  +---> Does the entry have BOTH `title` and `repoUrl`?
  |       |
  |       Yes --> Do both match the tool?
  |       |        |
  |       |        Yes --> MATCH -> ignore this tool
  |       |        No  --> SKIP
  |       |
  |       No --> continue
  |
  +---> Does the entry have only `title`?
  |       |
  |       Yes --> Does `tool.title === entry.title`?
  |       |        |
  |       |        Yes --> MATCH -> ignore this tool
  |       |        No  --> SKIP
  |       |
  |       No --> continue
  |
  +---> Does the entry have only `repoUrl`?
          |
          Yes --> Does `tool.links.repoUrl === entry.repoUrl`?
                   |
                   Yes --> MATCH -> ignore this tool
                   No  --> SKIP

If no entry matches after checking all: KEEP the tool
```

---

## Usage Guide

### Variation 1: Ignore by Title

Remove a tool from **every** category it appears in. Use when the tool itself is the problem (deprecated, spam, etc.).

```json
{
  "title": "SIO-AsyncAPI",
  "reason": "Project is deprecated and no longer maintained"
}
```

**Effect:** Every entry with `title === "SIO-AsyncAPI"` is removed from all categories (APIs, Code-first tools, etc.).

### Variation 2: Ignore by repoUrl (Quick Remove)

Remove a tool by its repo URL alone, without needing to know or specify its title. Useful for quickly blocking a fork or spam repo.

```json
{
  "repoUrl": "https://github.com/hkirat/asyncapi-fork",
  "reason": "Unauthorized fork"
}
```

**Effect:** Every entry whose `repoUrl` matches `"https://github.com/hkirat/asyncapi-fork"` is removed from all categories, regardless of what title the tool has.

### Variation 3: Ignore by Title + repoUrl (Specific Fork)

Remove only a specific fork/clone while keeping the original. Use when multiple tools share the same title but have different repositories, and you want maximum precision.

```json
{
  "title": "AsyncAPI Studio",
  "repoUrl": "https://github.com/Shurtu-gal/action-test-bed",
  "reason": "Fork repository, not the official AsyncAPI Studio"
}
```

**Effect:** Only the entry with title `"AsyncAPI Studio"` AND repo `"https://github.com/Shurtu-gal/action-test-bed"` is removed. The official `asyncapi/studio` and any other forks with different repos are untouched.

### Variation 4: Ignore by Title with Category Scope

Remove a tool from specific categories only. Use when a tool is correctly listed in some categories but incorrectly appears in others.

```json
{
  "title": "Zod Sockets",
  "reason": "Not primarily a framework, better categorized as code-first and DSL",
  "categories": ["Frameworks"]
}
```

**Effect:** `"Zod Sockets"` is removed from the `"Frameworks"` category only. It remains in `"Code-first tools"` and `"DSL"`.

### Variation 5: Ignore by repoUrl with Category Scope

Remove a repo from specific categories only, without needing the title. Useful when a repo auto-populates into wrong categories.

```json
{
  "repoUrl": "https://github.com/example/some-tool",
  "reason": "Incorrectly categorized in CLIs",
  "categories": ["CLIs"]
}
```

**Effect:** The tool with that repo URL is removed only from `"CLIs"`. It remains in all other categories.

### Variation 6: Ignore by Title + repoUrl + Category Scope

The most precise option. Targets a specific repo in specific categories.

```json
{
  "title": "HTML Template",
  "repoUrl": "https://github.com/dipaksodani/async-gen",
  "reason": "Fork, only remove from templates listing",
  "categories": ["AsyncAPI Generator Templates"]
}
```

**Effect:** Only the specific fork is removed, and only from the `"AsyncAPI Generator Templates"` category.

---

## Why This Design?

### Why are both title and repoUrl optional?

Either field can serve as the primary identifier depending on the use case. `title` makes the ignore file human-readable and reviewable. `repoUrl` enables quick, precise removal when you have a repo URL at hand (e.g., from a GitHub notification) without needing to look up the tool's display title. When both are provided, they form an AND condition for maximum precision.

### Why exact matching instead of fuzzy/regex?

Exact matching is predictable and auditable. When a maintainer adds an ignore rule, they can be certain it will only affect the exact tool they specified. Fuzzy matching could produce surprising results (e.g., ignoring "AsyncAPI" could match "AsyncAPI CLI", "AsyncAPI Studio", etc.).

### Why category scoping?

The same tool frequently appears in multiple categories (e.g., a tool categorized as both `code-first` and `framework`). Category scoping lets maintainers make precise corrections to categorization without removing the tool entirely.
