# AsyncAPI website

This repo contains the asyncapi.org website. It's powered by [Hugo](https://gohugo.io).

## Installation

Follow [Hugo](https://gohugo.io) installation instructions to install the website.

## Running in development

Start a development server:

```bash
hugo server -D
```

## Adding a new documentation page

```bash
hugo new docs/page_name.md
```

> This will create a draft version of your page. Make sure you remove `draft: true` from the front-matter of the document once it's ready to get published.

## Removing a page

Just remove the page file. E.g., `rm content/docs/page_name.md`.
