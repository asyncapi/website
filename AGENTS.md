# AI Agent Guidelines for AsyncAPI Website

> This file is automatically read by AI coding assistants (OpenAI Codex, GitHub Copilot, CodeRabbit, and others). It supplements [CONTRIBUTING.md](./CONTRIBUTING.md) with machine-readable project rules.

## Contribution Workflow

- **Always open an issue first** and get it approved before submitting a PR, unless the change is a typo or an obvious error.
- **One PR = one change.** Do not bundle multiple fixes, features, or refactors into a single PR.
- If an issue already exists for the work, reference it in the PR description (e.g., `Closes #1234`).
- Issues and PRs without activity from the creator within 14 days will be automatically closed.

## PR Title Format (Required)

PR titles **must** follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) specification. The CI will block merging if the title does not conform.

Use one of these prefixes:

| Prefix       | When to use                          |
|--------------|--------------------------------------|
| `fix:`       | Bug fix                              |
| `feat:`      | New feature                          |
| `docs:`      | Documentation-only change            |
| `chore:`     | Cleanup, dependency bumps, config    |
| `test:`      | Adding or updating tests             |
| `refactor:`  | Code restructuring without behavior change |

- Write titles in **imperative mood** (e.g., `fix: resolve broken link in docs`, not `fix: fixed broken link`).
- Keep titles clear, concise, and self-descriptive.

## Pre-Submission Checklist

Before opening a PR, ensure the following pass locally:

```bash
npm run lint        # ESLint checks
npm run lint:fix    # Auto-fix linting issues
npm run test        # Jest unit tests
npm run test:e2e    # Cypress end-to-end tests (optional but recommended)
```

## Tech Stack

- **Framework:** Next.js 15 with static export (`output: 'export'`)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3 with custom theme (see `tailwind.config.ts`)
- **Content:** MDX for blog posts and documentation (in `markdown/` directory)
- **Testing:** Jest (unit/script tests), Cypress (E2E)
- **Deployment:** Netlify (static site + edge functions)
- **Internationalization:** i18next with next-i18next (locales: `en`, `de`, `zh_cn`)
- **Component docs:** Storybook 8

## Project Structure

```
pages/            # Next.js page routes (includes [lang]/ for i18n)
components/       # Reusable React/TypeScript UI components
markdown/         # Blog posts, docs, and about content (MDX/MD)
scripts/          # Build and data-generation scripts (TypeScript)
config/           # JSON schemas, data files, finance configs
types/            # TypeScript type definitions
utils/            # Shared utility functions
context/          # React Context providers
styles/           # Global CSS and Tailwind imports
tests/            # Jest test files
cypress/          # Cypress E2E test files
public/           # Static assets, images, i18n locale JSON files
netlify/          # Netlify edge functions
.github/          # GitHub Actions workflows
```

## Code Style Rules

- **Indentation:** 2 spaces (no tabs)
- **Quotes:** Single quotes
- **Semicolons:** Required
- **Trailing commas:** None
- **Max line length:** 120 characters (URLs and classNames are exempt)
- **Line endings:** LF (Unix-style)
- **Imports:** Use `type` keyword for type-only imports (`import type { Foo } from '...'`)
- **Path aliases:** Use `@/` prefix to reference project root (e.g., `@/components/Button`)
- **Unused variables:** Prefix with `_` if intentionally unused (e.g., `_event`)
- **No console/debugger/alert** statements in production code
- **Import sorting:** Enforced by `eslint-plugin-simple-import-sort`

## Component Conventions

- Use **functional components** with explicit TypeScript interfaces for props.
- Destructure props in the function signature.
- Use **Tailwind CSS classes** for all styling; avoid inline styles and CSS modules.
- For translatable text, use `useTranslation` hook from `@/utils/i18n`.
- Storybook stories use the `Meta`/`StoryObj` pattern from `@storybook/react`.

## What NOT To Do

- Do not modify auto-generated files (`dashboard.json`, `roadmap.json`, `meetings.json`, etc.) by hand.
- Do not commit `.env` or credential files.
- Do not add new dependencies without justification in the PR description.
- Do not change multiple unrelated things in one PR.
- Do not skip or disable ESLint rules without maintainer approval.
- Do not use `any` type in TypeScript; use proper types or `unknown`.
