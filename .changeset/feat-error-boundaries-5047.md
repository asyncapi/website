---
'asyncapi-website': patch
---

feat(ui): add a top-level React `ErrorBoundary` and wrap every `Layout` return tree in it, so a render error in any descendant component (broken MDX page, future page, etc.) no longer tears down the whole site — it shows a recoverable fallback instead.
