---
'asyncapi-website': patch
---

perf(dashboard): replace `timelineItems` GraphQL lookup with the top-level `updatedAt` field across all dashboard queries. This reduces API calls and request complexity since the score calculation no longer needs a separate timeline sub-query.
