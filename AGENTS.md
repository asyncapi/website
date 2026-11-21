AsyncAPI Website AI Contribution Guide

This file provides project-specific guidance for AI coding agents working in the AsyncAPI website repository.

It supplements CONTRIBUTING.md. It does not replace it. Read CONTRIBUTING.md and follow its contribution requirements.

1. Before Making Changes

- Identify the GitHub issue or task being addressed. Per CONTRIBUTING.md, generally open an issue before starting a pull request unless it is a typo or obvious error.
- Read the relevant existing code and documentation.
- Search for existing components, utilities, patterns, or content that can be reused.
- Keep the change limited to the issue. Do not make unrelated refactors, dependency updates, formatting changes, or cleanup.
- Prefer existing repository patterns over generic Next.js, React, TypeScript, or Tailwind conventions.

2. Repository

The website is built with Next.js, React, TypeScript, Tailwind CSS, Storybook, and Cypress. See `package.json`, `next.config.mjs`, `tailwind.config.ts`, `.storybook/`, and `cypress.config.js`.

Important directories include:

- `components/` - reusable React components
- `pages/` - Next.js pages (`tsx`, `ts`, `md`, `mdx` per `pageExtensions` in `next.config.mjs`)
- `markdown/` - website content (`about/`, `blog/`, `docs/`)
- `docs/` - maintainer notes only (dashboard data collection, fixes); not the website docs content
- `assets/docs/fragments/` - shared Markdown fragments
- `config/` - static data and JSON/YAML used by pages and build scripts
- `public/` - static assets
- `cypress/` - end-to-end tests (`*.cy.js`)
- `styles/` - global styles
- `scripts/` - build and generation scripts
- `types/` - TypeScript types
- `utils/` - helpers including `utils/i18n.ts`
- `tests/` - Jest tests for scripts
- `netlify/` - Netlify functions and edge functions

Website docs content lives in `markdown/docs/` and `pages/docs/`. Do not confuse them with the top-level `docs/` folder.

Check the existing structure before creating new files or directories.

3. Development

- `README.md` states Node.js `v20.12.0+` and npm `v10.5.0+`, but `.nvmrc` pins `20.11.0` and `netlify.toml` pins `NODE_VERSION 20.11.0` / `NPM_VERSION 10.2.4`. CI reads Node version from `.nvmrc`. Use the pinned versions for CI parity.
- Install dependencies with `npm install` (`if-nodejs-pr-testing.yml` uses `npm ci` in CI).
- Run the website with `npm run dev` (served at `http://localhost:3000`). This runs `build-scripts` first (`build:pages` + `lint:mdx` + `build:posts`).
- Run Storybook with `npm run dev:storybook` (served at `http://localhost:6006`).

4. Validation

Run the checks relevant to the change. Do not claim a check passed unless it was actually run.

- JavaScript/TypeScript linting: `npm run lint` (`next lint`). Fix with `npm run lint:fix`.
- Markdown/MDX linting: `npm run lint:mdx` (`remark "**/*.mdx"`, configured by `.remarkrc`). Format MDX with `npm run format:mdx`.
- Production build: `npm run build` (also runs `build-scripts`). Static export output goes to `out/` (`output: 'export'` in `next.config.mjs`, `publish = "out"` in `netlify.toml`, `start` serves `out`).
- Storybook build: `npm run build:storybook`.
- Unit tests: `npm test` (`jest --passWithNoTests`, matches `tests/**/*.test.*` except `netlify/`).
- Markdown checks: `npm run test:md`.
- Locale checks: `npm run test:locales`.
- Edit-link checks: `npm run test:editlinks`.
- E2E tests: `npm run test:e2e` (`cypress run --browser chrome`, `baseUrl: http://127.0.0.1:3000`).

CI (`if-nodejs-pr-testing.yml`) runs `npm test`, `npm run lint`, `test:md`, and `test:locales` on Ubuntu. Note `next.config.mjs` sets `eslint.ignoreDuringBuilds: true`, so lint is not enforced by the build.

5. Code Changes

React and Next.js:

- Before creating a new component, search `components/` for an existing one and follow existing component and routing patterns.
- When changing a shared component, check its existing usages before changing its API.

TypeScript and lint:

- `tsconfig.json` uses `strict: true`, `target ES2022`, and path alias `@/*` mapping to the repo root.
- Reuse types from `types/` instead of introducing new top-level types or `any`.
- ESLint extends `airbnb-base`, `airbnb-typescript`, `next/core-web-vitals`, `prettier`, and `storybook`. Notable enforced rules: `no-console: error`, `max-len: 120`, single quotes, no trailing commas. Do not modify TypeScript or ESLint configuration to bypass an error.

Tailwind CSS:

- Use `tailwind.config.ts` and existing project colors, fonts, and utilities before adding custom values.

MDX pipeline:

- MDX is handled by `@next/mdx` with `pageExtensions: ['tsx', 'ts', 'md', 'mdx']`.
- Global MDX components come from `mdx-components.tsx`, which re-exports `mdxComponents` from `components/MDX/MDX`.
- Remark plugins used: `remark-frontmatter`, `remark-gemoji-to-emoji`, `remark-heading-id`, `remark-slug`, `remark-images`, `@fec/remark-a11y-emoji`, `remark-gfm`.

6. Documentation and Content

- Follow the existing structure and conventions of the content being changed.
- For shared Markdown content, check `assets/docs/fragments/` and reuse a fragment instead of duplicating content. README documents the `import ... from '@/assets/docs/fragments/...'` + `<Fragment />` pattern.
- For new blog posts, run `npm run write:blog`. The generator (`scripts/compose.ts`) writes to `pages/blog/<slug>.md`. Store post images in `public/img/posts/` as compressed `.webp` with descriptive `alt` text, per the generator template.
- Case studies use YAML in `config/casestudies/` validated against `scripts/casestudies/schema.json`; images go in `public/img/casestudies` and `public/resources/casestudies`.

Internationalization (i18n):

- Config is `next-i18next.config.cjs` (`locales: ['en', 'de']`, namespaces `['landing-page', 'common', 'tools']`) and `utils/i18n.ts` (`useTranslation` re-export, `i18nPaths`).
- Follow `ADDING_TRANSLATIONS.md` when adding or changing translated strings.
- The `locales/` directory described there does not currently exist in the checkout; verify whether it exists before editing translation JSON files.
- Adding `useTranslation()` to a Cypress-covered component may require updating Cypress tests.

7. Assets and Dependencies

- Before adding an asset, check whether it already exists, reuse it when appropriate, and place it in the directory used by the relevant feature (for example, `public/img/posts/`, `public/img/casestudies/`).
- Before adding a dependency, check whether an existing dependency already provides the functionality. Add one only when necessary. Do not update unrelated dependencies.

8. Secrets and Environment Variables

- Never commit secrets or local environment files.
- There is no committed `.env` file or `.env.example`. Scripts load env with `dotenv.config()` (for example `scripts/tools/extract-tools-github.ts`) and read `process.env`.
- Env vars actually used in the repo include `GITHUB_TOKEN`, `YOUTUBE_TOKEN`, `CALENDAR_SERVICE_ACCOUNT`, `CALENDAR_ID`, `SLACK_TOKEN`, `KIT_API_KEY`, `DISCUSSION_TARGET_REPO_OWNER`, `DISCUSSION_TARGET_REPO_NAME`, `LOG_LEVEL`, plus `DOCS_LINK_CHECK_TIMEOUT` and `DOCS_LINK_CHECK_BATCH_SIZE`. They appear in `scripts/` and `netlify/functions/`. Do not add real values to the repo; set them locally only as needed for the script you run.

9. Git and Pull Requests

- Keep changes focused on the issue. Before committing, inspect `git status` and `git diff` and ensure no unrelated files were modified.
- Follow CONTRIBUTING.md for the full process, including the issue-first requirement and Code of Conduct.
- Pull request titles must follow Conventional Commits and are enforced by `lint-pr-title.yml`. The subject must start with a lowercase character (for example `fix:`, `feat:`, `docs:`, `chore:`, `test:`, `refactor:`).

10. AI Agent Rules

- Inspect the repository and relevant existing implementations before making assumptions.
- Reuse existing components, utilities, patterns, and content structures where appropriate.
- Keep changes narrowly scoped to the issue.
- Do not introduce unrelated refactors, dependency updates, formatting changes, or new abstractions without a clear requirement.
- Treat CONTRIBUTING.md, the current GitHub issue, and existing repository configuration as authoritative over generic framework conventions.
- Do not claim tests or validation passed unless they were actually run.

11. Final Check

Before opening a PR:

- Confirm the change directly addresses the issue.
- Confirm no unrelated files were changed.
- Review `git diff`.
- Run the relevant validation checks.
- Confirm no secrets or local configuration were committed.
- Confirm the PR title follows the repository's Conventional Commit requirement.
