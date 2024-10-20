---
title: "Overview"
weight: 1
---
Migration to a new major version is always difficult, and AsyncAPI is no exception, but we want to provide as smooth a transition as possible.

If you are just looking to update your AsyncAPI document, then we suggest you use the [AsyncAPI converter](https://github.com/asyncapi/converter-js). You can do this directly in the CLI with:

```bash
asyncapi convert asyncapi.json --output=new_asyncapi.json --target-version=x.x.x
```

For a detailed read-through about all the changes (non-breaking as well), please do [read the release notes](https://www.asyncapi.com/blog?tags=Release+Notes) for the desired version before hand, as it will give you some more context about the changes.

Here are all the migration guides:
- [Migrating to v3](/docs/migration/migrating-to-v3)
