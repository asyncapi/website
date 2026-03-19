---
title: Create Short URLs for the AsyncAPI Website
description: Learn how to create short, memorable redirect links for the AsyncAPI website using the Netlify-powered `_redirects` file.
weight: 10
---

## Introduction

Short URLs make it easier for users to access commonly shared AsyncAPI resources (e.g., `asyncapi.com/slack` instead of long invite links). To avoid conflicts with existing routes (like `/docs`, `/community`, etc.), all short URLs **must use the `/s/` path prefix**. These short links are powered by Netlify server-side redirects using the `_redirects` file, ensuring fast, reliable, and CDN-level redirection.

## Understanding the `_redirects` file

The `_redirects` file is a plain text file that defines redirect rules for the AsyncAPI website. Netlify uses this file during deployment and applies the redirects at the CDN (edge) level, meaning the redirect occurs before the page loads, ensuring high performance and a better user experience.

### File Location

For the AsyncAPI website, the `_redirects` file is located at: `public/_redirects`

### How Redirects Are Processed

Netlify reads the `_redirects` file top to bottom and applies the first matching rule, so the order of rules matters.

## Defining a Short URL Rule

Each short URL must start with `/s/` to avoid conflicts with existing site paths. Write each redirect rule on a single line, with space-separated values:

```text
/s/short-path   https://destination.url   status
```

Where `status` can have one of the following values:

- 301: Permanent - for links that remain unchanged.
- 302: Temporary - for links that may change in the future.

### Examples

```text
/s/slack-invite   https://asyncapi.com/slack   302
/s/modelina       /tools/modelina              301
/s/github         https://github.com/asyncapi  301
```

## Steps to Add a New Short URL

1. Navigate to the [`public/_redirects` file](https://github.com/asyncapi/website/blob/master/public/_redirects) in the AsyncAPI website repository ([local setup guide](https://github.com/asyncapi/website?tab=readme-ov-file#run-locally)).

2. Add a new redirect rule on a separate line. You may include a comment above the rule for clarity. For example:
    ```text
    # Permanent redirect to the main Studio app
    /s/asyncapiv2 https://raw.githubusercontent.com/asyncapi/asyncapi/2.0.0/examples/2.0.0/streetlights.yml 301
    ```

3. Raise a PR with a clear description of the changes ([contribution guide](https://github.com/asyncapi/website/blob/master/CONTRIBUTING.md)).

---
