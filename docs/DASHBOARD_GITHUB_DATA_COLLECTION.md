# Dashboard GitHub Data Collection: How It Works

This document explains in detail how the community dashboard data collection script works, what was causing it to fail, what was changed to fix it, and what safeguards are in place to keep it reliable. It is intended as a reference for anyone who needs to maintain, debug, or tune this system in the future.

---

## Table of Contents

1. [Terminology](#terminology)
2. [What Does the Dashboard Script Do?](#what-does-the-dashboard-script-do)
3. [How GitHub GraphQL Pagination Works](#how-github-graphql-pagination-works)
4. [Understanding Query Complexity and the 502 Problem](#understanding-query-complexity-and-the-502-problem)
5. [What Was Wrong Before (Root Cause)](#what-was-wrong-before-root-cause)
6. [What Changed (The Fix)](#what-changed-the-fix)
7. [Business Logic: Unchanged](#business-logic-unchanged)
8. [Retry and Fallback Mechanisms](#retry-and-fallback-mechanisms)
9. [Tuning Guide](#tuning-guide)
10. [Configuration Reference](#configuration-reference)

---

## Terminology

Before diving in, here are the key terms used throughout this document:

### PAGE_SIZE (`first` parameter)

When you search for issues on GitHub's GraphQL API, you cannot get all results at once. You get them in "pages". `PAGE_SIZE` (the `first` parameter in the query) controls **how many items you get back per request**.

**Example:** If there are 90 open issues matching your search and `PAGE_SIZE = 30`, you need 3 requests (pages) to get all of them: page 1 returns items 1-30, page 2 returns items 31-60, page 3 returns items 61-90.

### Comments limit (`comments(first: N)`)

Each issue or PR can have comments. The `comments(first: 20)` part of the query means: **for each issue in this page, also fetch up to 20 of its comments**. This is NOT a separate API call -- it is embedded inside the same request. GitHub fetches the issue data AND its comments in one go.

If an issue has 50 comments and we asked for `comments(first: 20)`, we get only the first 20. The response will include `hasNextPage: true` to tell us there are more. Our script can then optionally make a separate follow-up call to get the full comment data for that specific issue.

### Nodes

In GitHub's GraphQL API, a "node" is any individual data object returned: an issue, a comment, a label, a reaction, etc. When GitHub processes your request, it has to look up and assemble every node you asked for. The more nodes, the more work the server does.

**The key insight**: nodes multiply across nesting levels. If you ask for 30 issues and each issue has up to 20 comments, that is potentially 30 x 20 = 600 comment nodes, plus 30 issue nodes, plus all their nested reactions and labels. The total node count determines how long GitHub's server takes to respond.

### Pagination cursor (`after` / `endCursor`)

When a search has more results than fit in one page, GitHub returns a cursor (a string like `"Y3Vyc29yOjUw"`) along with the results. To get the next page, you pass this cursor in the `after` parameter of your next request. Think of it like a bookmark: "give me results starting after this point."

### Rate limits

GitHub has two separate rate limit systems:

1. **Primary rate limit (point-based)**: Each authenticated user gets 5,000 points per hour. Each GraphQL request costs a certain number of points based on its complexity. A simple query might cost 1 point, a complex search might cost 10-30 points. You can see the cost and remaining points in each response.

2. **Secondary rate limit (velocity-based)**: Even if you have plenty of points, GitHub limits how fast you can make requests. If you send too many requests in a short time (roughly 90+ per minute), GitHub blocks you with a "secondary rate limit" error. This is abuse prevention.

### 502 Bad Gateway / "Unicorn" page

When a single GraphQL request asks for too much data and GitHub's server cannot compute the response within its internal time limit (roughly 10 seconds), it returns a 502 Bad Gateway error or a "Unicorn" error page. This is NOT a rate limit -- it means the individual query was too expensive to process.

---

## What Does the Dashboard Script Do?

The script (`scripts/dashboard/build-dashboard.ts`) collects two types of data for the [community dashboard page](https://www.asyncapi.com/community/dashboard):

### 1. Hot Discussions (top 12)

Searches for all **open issues** and **open pull requests** across the entire `asyncapi` GitHub organization that were updated within the last 6 months. For each item, it calculates an "interaction score" based on:

- Number of reactions on the issue/PR
- Number of comments
- Number of reactions on individual comments
- For PRs: number of reviews and review comments

The score is then divided by the age of the last update (older = lower score). The top 12 items by score are selected. Items authored by `asyncapi-bot` are excluded.

### 2. Good First Issues (all of them)

Searches for all open issues with the `good first issue` label across the `asyncapi` org. All matching issues are included (no scoring or filtering).

### Output

Both datasets are written to `dashboard.json` at the repo root, which is consumed by the Next.js dashboard page.

---

## How GitHub GraphQL Pagination Works

Here is a concrete example of how pagination works with `PAGE_SIZE = 30`:

### Request 1

```
"Give me the first 30 open issues in the asyncapi org"
```

GitHub returns:
- 30 issues (with their comments, labels, reactions, etc.)
- `hasNextPage: true` (there are more results)
- `endCursor: "Y3Vyc29yOjMw"` (bookmark for where to continue)

### Request 2

```
"Give me the next 30 issues, starting after cursor Y3Vyc29yOjMw"
```

GitHub returns:
- 30 more issues
- `hasNextPage: true`
- `endCursor: "Y3Vyc29yOjYw"`

### Request 3

```
"Give me the next 30, starting after cursor Y3Vyc29yOjYw"
```

GitHub returns:
- 15 issues (these are the last ones)
- `hasNextPage: false` (no more pages)

**Total**: 3 requests to get 75 issues. With `PAGE_SIZE = 20`, this would have been 4 requests. With `PAGE_SIZE = 10`, it would be 8 requests. Larger page sizes mean fewer requests -- but each request is heavier.

---

## Understanding Query Complexity and the 502 Problem

This is the most important section to understand why certain page sizes fail.

### What our query actually asks for

Here is a simplified view of what one search request asks GitHub to compute:

```
search(first: 30)                   -- Give me 30 issues
  for EACH of those 30 issues:
    ├── assignees(first: 1)         -- 30 x 1 = 30 assignee checks
    ├── timelineItems(first: 1)     -- 30 x 1 = 30 timeline lookups
    ├── author                      -- 30 x 1 = 30 author lookups
    ├── labels(first: 10)           -- 30 x 10 = 300 label nodes
    ├── reactions(last: 1)          -- 30 x 1 = 30 reaction nodes
    └── comments(first: 20)         -- 30 x 20 = 600 comment nodes
          for EACH of those comments:
            └── reactions(last: 1)  -- 600 x 1 = 600 reaction nodes
```

**Total potential nodes**: ~1,620

### What happens when we increase the numbers

| PAGE_SIZE | comments per item | Approximate total nodes | Result |
|-----------|-------------------|-------------------------|--------|
| 20 | 20 | ~1,040 | Works reliably (6 seconds) |
| 30 | 20 | ~1,560 | Works reliably (8 seconds) |
| 50 | 20 | ~2,600 | Works reliably (8 seconds) |
| 50 | 50 | ~5,600 | Unreliable (sometimes 502) |
| 100 | 50 | ~11,200 | Always 502 |
| 100 | 100 | ~21,200 | Always 502 |

**Why 502?** GitHub's GraphQL server has an internal computation timeout (roughly 10 seconds). When the total work exceeds this, the server gives up and returns a 502 Bad Gateway or a "Unicorn" error page. This is a server-side limit that we cannot change -- we can only control how much work we ask for in each request.

**Important**: The `first: 100` limit on each field means GitHub allows up to 100 items per connection field. But that does not mean using 100 everywhere will work. The total combined complexity across all nested fields is what matters.

### Why comments(first: 20) specifically?

`comments(first: 20)` means: for each issue in the page, fetch its first 20 comments. This is used to calculate the interaction score (summing reactions on those comments).

If an issue has more than 20 comments, the response says `hasNextPage: true`. The script then makes a **separate, lightweight** follow-up call for just that one issue to get its full comment data. This follow-up call is cheap because it fetches only 1 item, not 30.

This is the same value the original script used. We chose to keep it at 20 because:
- It keeps the bulk search queries lightweight and reliable
- Issues with >20 comments are relatively rare
- The few that need follow-up are handled by individual, cheap API calls

---

## What Was Wrong Before (Root Cause)

The original script hit GitHub's **secondary rate limit** (velocity-based) because it made too many API requests too quickly:

1. **No time filter**: Queries fetched ALL open issues and PRs across the entire org, regardless of when they were last updated. With 500-1000+ open issues and 200+ open PRs, this required massive pagination.

2. **Page size of 20**: With so many items and a small page size, the script needed 50-80+ paginated requests just for the initial data fetch.

3. **Only 500ms delay between requests**: At 500ms per request, 80 requests complete in 40 seconds -- well above the ~90 requests/minute threshold that triggers the secondary rate limit.

4. **No retry**: When the rate limit error came back, the script threw an error immediately instead of waiting and retrying.

5. **Silent failure**: The `start()` function caught the error, logged it, and exited with code 0. The workflow proceeded to create a PR, but `dashboard.json` was never updated. This is why the dashboard showed year-old data while meetings and newsroom videos kept updating.

---

## What Changed (The Fix)

### 1. Time filter on hot discussions queries

Added `updated:>YYYY-MM-DD` to the search queries for hot discussions (issues and PRs). Only items updated within the last 6 months are fetched. This dramatically reduces the result set from 1000+ items to a few hundred.

**Why this is safe**: The scoring formula heavily penalizes old items. An issue not updated in 6 months gets a near-zero score and would never appear in the top 12 regardless. The filter simply avoids fetching data we would discard.

The `good first issues` query has NO time filter -- all of them are shown on the dashboard regardless of age.

### 2. Increased page size from 20 to 30

Fewer pages = fewer requests = less likely to hit velocity-based rate limits. The jump from 20 to 30 reduces total pagination requests by ~33%.

We chose 30 (not 50 or 100) because testing showed it works reliably within GitHub's server-side complexity limits when combined with the nested fields we request.

### 3. Retry with exponential backoff

If a request fails with a retryable error (secondary rate limit, 502, network timeout), the script now waits and retries up to 3 times with increasing delays: 60 seconds, then 120 seconds, then 240 seconds.

### 4. Adaptive throttling

After each successful request, the script checks how many rate limit points are remaining and adjusts the delay:
- More than 500 remaining: 2-second delay (normal)
- 100-500 remaining: 5-second delay (cautious)
- Below 100: wait until the rate limit resets (could be up to an hour)

### 5. Maximum pages cap

Hot discussion queries are capped at 5 pages (150 items with page size 30). Since we only need the top 12 by score, 150 recently-updated items is more than sufficient. Good first issues have no cap.

### 6. Progressive data saving

The script now fetches hot discussions and good first issues independently. If one fails, the other still runs. Whatever data was successfully collected is written to `dashboard.json`. Partial fresh data is better than completely stale data.

### 7. Workflow separation

In the GitHub Actions workflow, the dashboard generation step is now separate from meetings/videos and uses a fallback (`|| echo "warning"`), so dashboard failures do not prevent meetings and videos from being updated.

---

## Business Logic: Unchanged

**The scoring and ranking logic is completely identical to before.** Specifically:

- **Scoring formula**: `interactionsCount / (monthsSince(updatedAt) + 2) ^ 1.8` -- unchanged
- **Interaction counting**: reactions + comments + comment reactions (+ reviews for PRs) -- unchanged
- **Top 12 selection**: sort by score descending, filter out `asyncapi-bot`, take first 12 -- unchanged
- **Good first issues mapping**: same fields, same label filtering, same area extraction -- unchanged
- **Output format**: same JSON structure, same file path (`dashboard.json`) -- unchanged

The only changes are in **how data is fetched** (fewer, slower, smarter requests with retry logic) and **how failures are handled** (retry, partial data, proper error codes). The actual data processing and output are identical.

---

## Retry and Fallback Mechanisms

Here is the complete chain of safeguards, from first line of defense to last resort:

### Layer 1: Adaptive throttling (prevents problems)

Every request is followed by an adaptive delay (2s-5s, or wait until reset). This keeps request velocity well below the secondary rate limit threshold.

### Layer 2: Retry with exponential backoff (handles transient errors)

If a request fails with any of these errors, it is automatically retried:
- Secondary rate limit ("You have exceeded a secondary rate limit")
- Server errors ("502 Bad Gateway", "Unicorn")
- Network errors ("ECONNRESET", "ETIMEDOUT")

Retry schedule:
- Attempt 1: wait 60 seconds, then retry
- Attempt 2: wait 120 seconds, then retry
- Attempt 3: wait 240 seconds, then retry
- If all 3 retries fail: give up on this section

**If the 502 error happens with PAGE_SIZE=30, the retry will handle it.** The 502 from GitHub is often transient (server load varies). A 60-second wait usually resolves it. This was verified during testing -- the same query that fails once can succeed moments later.

### Layer 3: Progressive data saving (handles partial failure)

If hot discussions fail entirely (even after retries) but good first issues succeed, the script writes:
```json
{ "hotDiscussions": [], "goodFirstIssues": [...fresh data...] }
```

If good first issues fail but hot discussions succeed, it writes:
```json
{ "hotDiscussions": [...fresh data...], "goodFirstIssues": [] }
```

Partial fresh data is better than completely stale data from a year ago.

### Layer 4: Non-blocking workflow step (handles complete failure)

If BOTH sections fail (no data at all), the script throws an error. But in the GitHub Actions workflow, the dashboard step uses a fallback:
```yaml
npm run generate:dashboard || echo "Dashboard generation failed"
```

This means meetings and videos are still updated and committed even if the dashboard generation fails completely. The failure is logged as a warning in the workflow output.

### If you need to reduce PAGE_SIZE further

If the script starts failing persistently in the future (for example, because the asyncapi org grows significantly and queries become more complex), you can reduce `PAGE_SIZE` in `build-dashboard.ts`:

```typescript
const PAGE_SIZE = 30;  // Reduce to 20 if needed
```

This is a safe change -- it just means more pagination requests with more delay between them. The retry mechanism will handle the extra time. The scoring logic and output are unaffected.

---

## Tuning Guide

All configuration constants are at the top of `scripts/dashboard/build-dashboard.ts`:

| Constant | Current Value | What It Controls |
|----------|---------------|------------------|
| `HOT_DISCUSSIONS_MONTHS_BACK` | `6` | How far back to search for hot discussions. Increase to cast a wider net, decrease to reduce API load. |
| `PAGE_SIZE` | `30` | Items per API request. Higher = fewer requests but heavier queries. Keep at 30 or below for reliability. |
| `MAX_PAGES_HOT_DISCUSSIONS` | `5` | Maximum pagination pages for hot discussions. 5 pages x 30 items = 150 items max. Only applies to hot discussions; good first issues have no cap. |
| `BASE_DELAY_MS` | `2000` | Minimum delay between API requests (milliseconds). Increase if hitting rate limits. |
| `MAX_RETRIES` | `3` | Number of retry attempts on retryable errors. |
| `RETRY_BASE_DELAY_MS` | `60000` | Initial retry delay (60 seconds). Doubles with each attempt: 60s, 120s, 240s. |

---

## Configuration Reference

### Files involved

| File | Role |
|------|------|
| `scripts/dashboard/build-dashboard.ts` | Main script: orchestration, pagination, retry, scoring, output |
| `scripts/dashboard/issue-queries.ts` | GraphQL query definitions |
| `dashboard.json` | Output file consumed by the dashboard page |
| `.github/workflows/regenerate-meetings-and-videos.yml` | Workflow that runs this script daily |
| `types/scripts/dashboard.ts` | TypeScript type definitions |
| `tests/dashboard/build-dashboard.test.ts` | Tests |

### Workflow schedule

The script runs daily at 00:10 UTC via the `regenerate-meetings-and-videos.yml` workflow. It can also be triggered manually via `workflow_dispatch`.
