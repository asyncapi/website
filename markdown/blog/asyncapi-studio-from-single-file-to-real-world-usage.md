---
title: "AsyncAPI Studio: From Single File to Real World Usage"
date: 2026-05-14T09:00:00+02:00
type: Engineering
tags:
  - AsyncAPI
  - Specification
  - Avro
cover: /img/posts/zenwave/asynapi-studio.png
canonical: https://ivangsa.com/articles/2026-04-12-asyncapi-studio-from-single-file-to-real-world-usage/
authors:
  - name: Ivan Garcia Sainz-Aja
    photo: /img/avatars/ivangsa.webp
    link: https://ivangsa.com/about
    byline: Software Engineer. Speaker. Building ZenWave 360º
excerpt: "AsyncAPI Studio was previously a single in-memory file editor. This prevented the use of relative $refs to external .avsc Avro files. This new contribution now tracks the document source, resolves relative references, and can read and write files directly to disk using the browser's File System Access API when working with a local folder."
---

# AsyncAPI Studio: From Single File to Real World Usage

AsyncAPI Studio used to be a single-file editor and it could not resolve relative `$ref`s, and that was a problem for real-world usage.

If you use Kafka and Avro, your spec references external `.avsc` schema files. Studio couldn't resolve those and the preview would break. That single limitation made Studio impractical for real world multi-file documents.

AsyncAPI was also an in-memory editor. You paste a spec, validate it, close the tab. Nothing persists except a localStorage entry.

That model made sense for a quick preview. It is how Swagger Editor works. It is how Mermaid Editor works. But for real editing, you need to import/export the file and that was uncomfortable and error prone.

What Studio needed was to track where a document was opened from, and resolve relative references against that source. And if that source is a local folder, use the browser's File System Access API to read and write files directly to disk.

So, I contributed [#1224](https://github.com/asyncapi/studio/issues/1224) to fix this, as part of the AsyncAPI Bounty Program. It shipped last week. Here's what changed:

**Load from URL.** Use the menu button or just pass a `?url=` parameter and Studio loads the remote document. Relative `$ref`s resolve against the source URL, even after you edit.

**Open local folders.** Studio can request access to a local folder and show a file tree in the sidebar. AsyncAPI files show the live preview. `.avsc` and `.md` files get syntax-highlighted views.

And since you are already opening the whole folder, Studio now also previews Markdown files and Avro schemas as Mermaid diagrams. Your .avsc files are not just resolved, they are visualised.

**Save back to disk.** Changes go back to the original files. No export dialogues.

**Relative `$ref` resolution.** The root issue behind all of the above. Cross-file references now work whether the source is remote or local.

This is a different category of tool than what existed before. Closer to a native editor experience, in the browser.

I opened a [discussion](https://github.com/asyncapi/studio/discussions/1296) about where to take it next: dropping localStorage for folder and URL-based editing, adding OpenAPI and JSON Schema previews, LSP-based `$ref` navigation.

Try it at [studio.asyncapi.com](https://studio.asyncapi.com). And if you have opinions on the direction, the discussion is open.


