# AsyncAPI Website - Claude Instructions

This is the AsyncAPI website repository, built with Next.js 15, TypeScript, and Tailwind CSS.

## Contribution Rules

- Open an issue first and get it approved before submitting a PR (unless fixing a typo or obvious error).
- One PR per change. Do not bundle unrelated changes.
- Reference the issue in the PR description (e.g., `Closes #1234`).

## PR Title Format

PR titles must follow Conventional Commits. Use one of these prefixes:

- `fix:` for bug fixes
- `feat:` for new features
- `docs:` for documentation changes
- `chore:` for cleanup, dependency updates, config changes
- `test:` for test additions/updates
- `refactor:` for restructuring without behavior change

Titles must be imperative mood, clear, and descriptive. CI blocks merge on non-conforming titles.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix lint issues
npm run test         # Run Jest tests
npm run test:e2e     # Run Cypress E2E tests
npm run dev:storybook # Start Storybook (localhost:6006)
```

## Code Style

- 2 spaces, single quotes, semicolons required, no trailing commas
- Max line length: 120 characters
- LF line endings
- Use `@/` path alias for imports from project root
- Use `import type` for type-only imports
- Prefix intentionally unused variables with `_`
- No `console`, `debugger`, or `alert` in production code
- Import sorting enforced by eslint-plugin-simple-import-sort

## Architecture

- `pages/` - Next.js routes (includes `[lang]/` for i18n)
- `components/` - React components with TypeScript prop interfaces
- `markdown/` - MDX content (blog, docs)
- `scripts/` - Build/generation scripts in TypeScript
- `config/` - Data files, JSON schemas
- `types/` - TypeScript type definitions
- `utils/` - Shared utilities
- `context/` - React Context providers
- `tests/` - Jest tests
- `cypress/` - E2E tests
- `public/locales/` - i18n translation files (en, de, zh_cn)
- `netlify/` - Edge functions

## Conventions

- Functional components with explicit TypeScript interfaces for props
- Destructure props in function signatures
- Tailwind CSS for all styling; no inline styles or CSS modules
- Use `useTranslation` hook from `@/utils/i18n` for translatable text
- Storybook stories: use `Meta`/`StoryObj` pattern
- Static export: `output: 'export'` in next.config.mjs
- Node.js version: 20.11.0 (see .nvmrc)

## Do Not

- Modify auto-generated files (dashboard.json, roadmap.json, meetings.json) by hand
- Commit .env or credential files
- Add dependencies without justification
- Use `any` type; use proper types or `unknown`
- Skip or disable ESLint rules without maintainer approval
- Bundle multiple unrelated changes in one PR
