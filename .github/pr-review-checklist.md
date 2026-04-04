### What reviewers look for during PR review

The following points outline what maintainers check during a review. Addressing these beforehand helps streamline the process and reduces time to merge.

1. **PR Title**: Use a concise title that follows [Conventional Commits](https://www.conventionalcommits.org/) guidelines and clearly summarizes the change in [imperative mood](https://cbea.ms/git-commit/#imperative) (e.g. "fix: resolve broken link in docs sidebar").

1. **PR Description**: Clearly explain the problem being solved, summarize the changes, and reference the related issue with `Resolves #<issue-number>` or `Fixes #<issue-number>` to automate issue closure on merge.

1. **One Issue per PR**: Keep pull requests focused on a single issue. If additional improvements are discovered during development, open follow-up issues and reference them in the PR description.

1. **Documentation**: Update relevant documentation (README, inline comments, or `/docs` pages) to reflect the changes introduced.

1. **Blog Posts**: Blog PRs must include front matter with `title`, `date`, `type`, `tags`, `cover`, and `authors`. Images should be optimized (WebP preferred) and placed under `public/img/posts/`.

1. **Test Coverage**: New features and bug fixes should include meaningful tests that cover the intended behavior and relevant edge cases. Run `npm test` locally before pushing.

1. **TypeScript & Linting**: Code must pass `npm run lint` with no new warnings. Prefer explicit types over `any` and use existing utility types and interfaces where available.

1. **Component Guidelines**: React components should be placed in the appropriate directory under `components/`. Shared components go in `components/common/`, page-specific ones alongside their page. Use Tailwind CSS classes; avoid inline styles.

1. **Commit History**: Avoid force-pushing when possible. Incremental commits make it easier for reviewers to track changes between review rounds.

1. **Bot Comments**: Address comments from automated bots (CodeRabbit, SonarQube, Codecov). If you disagree with a bot suggestion, explain why in a reply or mark it as resolved so the review history stays clear.

1. **Accessibility**: Ensure interactive elements have appropriate ARIA labels, images have meaningful `alt` text, and color contrast meets WCAG AA standards.
