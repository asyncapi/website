## LLM docs discovery build

### Summary

The LLM docs generator creates machine-readable copies of website docs and blog posts at build time:

- `/llms.txt` — navigation map for agents ([llms.txt spec](https://llmstxt.org/))
- `/llms-full.txt` — concatenated **core product docs**
- `{slug}.md` — raw Markdown twin of each docs/blog/about URL (for example `/docs/concepts` → `/docs/concepts.md`)

Outputs are generated files (like `rss.xml`). Do not edit them by hand. Change the generator or `scripts/llms/config.ts` instead.

### Public contract

- `/llms.txt` (`text/markdown; charset=utf-8`): index with H1, summary, `##` sections of `- [title](url.md): note`. Community and blogs are under `## Optional`.
- `/llms-full.txt` (`text/markdown; charset=utf-8`): concatenated core pages with `Source: {url.md}` separators.
- `/docs.md`, `/docs/**/*.md`, `/blog/*.md`, `/about.md` (`text/markdown; charset=utf-8`): clean Markdown for that page.
- `/docs/reference/specification/latest.md`: 302 redirect to the same spec version as `/docs/reference/specification/latest` in `public/_redirects`.

HTML docs, blog, and about pages also expose hidden `<link rel="alternate" type="text/markdown">` and `<link rel="describedby" href="/llms.txt">` in `components/Head.tsx`. There is no View as Markdown button in the UI.

### Generated vs committed

Committed: generator code, this spec, Netlify headers, gitignore, tests.

Gitignored (rewritten every `npm run build` / `npm run dev`):

- `public/llms.txt`
- `public/llms-full.txt`
- `public/docs.md`
- `public/about.md`
- `public/docs/**/*.md`
- `public/blog/*.md`

### When it runs

`scripts/index.ts` calls `generateLlmsFiles()` immediately after `buildPostList()`, so `config/posts.json` already exists. Netlify runs `npm run build` on deploy. New markdown under `markdown/docs` or `markdown/blog` is picked up automatically; the docs-sync workflow does not need extra entries.

### Classification (folder, not importance)

Uses the same `rootSectionId` / `docsTree` as the docs sidebar:

- Core (main `llms.txt` sections **and** `llms-full.txt`): every docs root except the Optional denylist, plus `/about`
- Optional (`llms.txt` only, still get `{slug}.md`): `community`, all blog posts
- Omitted from `llms-full.txt` only: `*-explorer` pages, `/docs/reference/specification/v2.x`, specification versions other than `LATEST_SPEC_SLUG`

To move a section (for example include community in `llms-full.txt`), edit `OPTIONAL_ROOT_SECTION_IDS` in `scripts/llms/config.ts` and update `tests/llms/config.test.ts`. The latest spec version follows the HTML `latest` redirect in `public/_redirects`.

### Markdown conversion

Source is `markdown/` (not generated `pages/**/*.mdx`). `scripts/llms/convert-markdown.ts` turns MDX widgets into plain Markdown:

- `<CodeBlock>` → fenced code
- `<Remember>` / `<Warning>` → blockquotes
- Fragment imports from `@/assets/docs/fragments/*` → inlined
- `<DocsCards />` → list from `DOCS_CARD_ITEMS`
- `<Visualizer />` → one-line pointer to the HTML page
- `<Figure>` / `<YouTube>` → image / YouTube link
- Interactive widgets (comparisons, Twitter, etc.) omitted or noted
- `/img/...` rewritten to `https://www.asyncapi.com/img/...`
- Internal `/docs` and `/blog` links rewritten to `.md` twins when the target page exists

If a page is listed in `posts.json` but there is no matching file under `markdown/`, that page is skipped (no `.md` twin, not listed in the indexes). This is a safety net for leftover generated `pages/*.mdx` files on a local machine after a rename. A clean Netlify build copies `markdown/` into empty `pages/`, so this almost never happens in production.

**Example:** `where-to-contribute.md` was renamed to `how-to-contribute.md`. Your computer may still have an old `pages/docs/.../where-to-contribute.mdx` from a previous `build-pages` run. The HTML site would still try to build that leftover copy, but there is no `markdown/` source to turn into `{url}.md`, so the LLM generator ignores it instead of failing the whole website build.

To support a new MDX component, add a transform in `convert-markdown.ts` and a fixture test in `tests/llms/convert-markdown.test.ts`.

### Code map

- `scripts/llms/config.ts` — base URL, blurb, Optional ids, skip rules. `LATEST_SPEC_SLUG` is read from the `/docs/reference/specification/latest` redirect in `public/_redirects`.
- `scripts/llms/convert-markdown.ts` — MDX to Markdown
- `scripts/llms/urls.ts` — slug ↔ public path ↔ canonical `.md` URL
- `scripts/build-llms.ts` — wipe outputs, write per-page files and indexes
- `types/scripts/build-llms.ts` — shared types
- `netlify.toml` — `Content-Type` headers
- `public/_redirects` — `latest.md` redirect, kept on the same version as the HTML `latest` redirect

### How to run and test

```bash
npm run build-scripts
# or
npx tsx scripts/index.ts
```

Then open `/llms.txt`, `/llms-full.txt`, and a page such as `/docs/tutorials/getting-started/hello-world.md`.

Tests:

- `tests/llms/convert-markdown.test.ts`
- `tests/llms/urls.test.ts`
- `tests/llms/config.test.ts`
- `tests/build-llms.test.ts`
- `tests/index.test.ts` (asserts `generateLlmsFiles` is called after `buildPostList`)
