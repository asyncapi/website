# AsyncAPI Website — AI Agent Guidelines

Guidelines for AI coding assistants working on this repository. Read this before generating any code or PRs.

## Project Overview

- **Framework:** Next.js (Pages Router) with TypeScript (strict mode)
- **Styling:** Tailwind CSS 3 with a custom theme defined in `tailwind.config.ts`
- **Content:** Blog posts and docs are written in MDX/MD inside the `markdown/` directory
- **Testing:** Jest for unit/script tests, Cypress for E2E
- **Deployment:** Netlify (static site + edge functions)
- **i18n:** next-i18next with locales `en`, `de`, `zh_cn`
- **Component docs:** Storybook 8

## Project Structure

```text
pages/              # Next.js page routes (includes [lang]/ for i18n)
components/         # Reusable React/TypeScript UI components
markdown/           # Blog posts, docs, and about content (MDX/MD)
scripts/            # Build and data-generation scripts (TypeScript)
config/             # JSON schemas, data files, finance configs
types/              # TypeScript type definitions
utils/              # Shared utility functions
context/            # React Context providers
styles/             # Global CSS and Tailwind imports
tests/              # Jest test files
cypress/            # Cypress E2E test files
public/             # Static assets, images, i18n locale JSON files
netlify/            # Netlify edge functions
.github/            # GitHub Actions workflows
```

## Contribution Workflow

1. **Open an issue first** and get it approved before starting any PR, unless it's a typo or obvious fix
2. **One PR = one thing** — don't bundle multiple features or fixes into a single PR
3. PR titles **must** follow Conventional Commits:
   - `feat:` `fix:` `docs:` `chore:` `test:` `refactor:`
   - Use imperative mood (e.g. "add helper function", not "added helper function")
4. PR description should include `Resolves #<issue-number>` or `Fixes #<issue-number>`

## Dev Commands

```bash
npm install         # Install dependencies
npm run dev         # Start dev server
npm run build       # Production build
npm run lint        # Run ESLint
npm test            # Run Jest tests
npx cypress run     # Run Cypress E2E tests
```

Always run `npm run lint` before submitting. CI will fail on lint errors.

## Code Style

These are enforced by ESLint and will cause CI failures if not followed:

- **Single quotes**, no trailing commas, semicolons required
- **Max line length:** 120 characters (className strings are exempt)
- **`import type`** must be used for type-only imports (enforced by `@typescript-eslint/consistent-type-imports`)
- **Import ordering** is enforced by `simple-import-sort` — let the linter auto-fix this, don't manually rearrange
- **No `console.log`** — `no-console` is set to error
- **Prefer `const`** and arrow callbacks
- **Functional components** — the codebase uses functional components throughout
- **Destructure props** in function signatures

## Typography Components

The project has a design system for text. **New components should use these instead of raw HTML heading/paragraph tags:**

```tsx
// preferred
import Heading from '@/components/typography/Heading';
import Paragraph from '@/components/typography/Paragraph';

<Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.md}>Title</Heading>
<Paragraph typeStyle={ParagraphTypeStyle.md}>Body text</Paragraph>
```

`Heading` accepts `level` (h1-h6) and `typeStyle` props from `@/types/typography/Heading`.
`Paragraph` accepts `typeStyle` from `@/types/typography/Paragraph`.

## Tailwind Usage

This project uses **custom design tokens** defined in `tailwind.config.ts`. Use these instead of default Tailwind values:

**Colors** — use the project palette:
- `primary-100` through `primary-600` (purple tones)
- `secondary-100` through `secondary-600` (blue tones)
- `gray-50` through `gray-900` (custom gray scale)

**Font sizes** — use the project scale:
- Headings: `text-heading-xs`, `text-heading-sm`, `text-heading-md`, `text-heading-lg`, `text-heading-xl`
- Body: `text-body-sm`, `text-body-md`, `text-body-lg`

**Font families:**
- `font-heading` (Work Sans)
- `font-body` / `font-sans` (Inter)
- `font-mono` (Fira Code)

## Testing Conventions

- Jest tests go in `tests/` — test coverage is collected from `scripts/**/*.ts`
- Cypress E2E tests go in `cypress/`
- Use `data-testid` attributes for DOM hooks in components (e.g. `data-testid='Button-main'`)
- Naming: `data-testid='ComponentName-element'`

## TypeScript Conventions

- Prefer adding JSDoc comments to fields in props types/interfaces
- Data shape types/interfaces often use an `I` prefix (e.g. `IBlogPost`, `IHeadProps`)
- Prefer descriptive names for component props types/interfaces (e.g. `HeadingProps`, `ButtonProps`)
- Enum values are commonly used for component variants (see `@/types/`)

## Behavioral Guidelines

When modifying existing code:

- **Don't "improve" adjacent code** — touch only what the task requires
- **Match existing patterns** — even if you'd write it differently. Consistency over preference
- **Don't refactor what isn't broken** — if you spot unrelated issues, mention them, don't fix them in the same PR
- **Keep changes small** — if the scope grows beyond the original issue, suggest splitting into follow-up issues

## Boundaries — Do Not Touch

Unless explicitly asked:
- `package-lock.json` — only modify through `npm install`
- `.github/workflows/` — CI configuration
- Auto-generated config outputs (`config/tools.json`, `config/all-tags.json`, `config/posts.json`, etc.) — other `config/` files may be manually maintained
- `public/locales/` — translation files require sync across all locales

## Common Mistakes to Avoid

- Using raw `<h1>`–`<h6>` or `<p>` tags instead of `Heading`/`Paragraph` components
- Using default Tailwind colors (e.g. `text-blue-500`) instead of project tokens (`text-primary-500`)
- Importing types without `import type` — this breaks the build
- Not running `npm run lint` before committing — import sort order alone causes many CI failures
- Bundling unrelated changes into one PR
- Opening a PR without a linked issue
