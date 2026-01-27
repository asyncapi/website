---
title: 'Contributing via Pull Requests'
weight: 50
---

# Contributing via Pull Requests

## Getting Started

1. **Open an issue first** (unless it's a trivial fix)
2. **Set up environment** — Follow [DEVELOPMENT.md](../DEVELOPMENT.md)
3. **Create a branch** — Use prefixes: `feat/`, `fix/`, `docs/`, `refactor/`, `test/`, `chore/`

---

## PR Title Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

| Type | Description | Release |
|------|-------------|---------|
| `feat:` | New feature | MINOR |
| `fix:` | Bug fix | PATCH |
| `docs:` | Documentation | None |
| `chore:` | Maintenance | None |
| `test:` | Tests only | None |
| `refactor:` | Code refactoring | None |

**Breaking changes:** Add `!` → `feat!:`, `fix!:`

**Examples:**
- ✅ `feat: add AsyncAPI 3.0 validation support`
- ✅ `fix: resolve context loading with special characters`
- ❌ `Added new feature`
- ❌ `fix bug`

---

## PR Checklist

**Before submitting:**
- [ ] Branch synced with `main`
- [ ] `npm run build` passes
- [ ] `npm run cli:test` passes
- [ ] `npm run lint` passes (max 5 warnings)
- [ ] Documentation updated (if needed)

**Code quality:**
- [ ] Follows existing code patterns
- [ ] TypeScript types used (avoid `any`)
- [ ] Error handling implemented
- [ ] Tests added for new functionality
- [ ] No `console.log` or commented code

---

## Code Standards

| Area | Guideline |
|------|-----------|
| **TypeScript** | Explicit types, interfaces for objects, prefer `const` |
| **Organization** | Follow existing structure, use path aliases (`@/`, `@cli/`, `@domains/`) |
| **Errors** | Use custom errors from `src/errors/`, return `ServiceResult<T>` from services |
| **Commands** | Extend base `Command`, use domain services for business logic |

---

## Testing

**Add tests for:**
- New commands or API endpoints
- Bug fixes (regression tests)
- New domain services
- Complex business logic

```bash
npm run cli:test      # All tests
npm run unit:test     # Unit tests only
```

---

## Best Practices

| ❌ Avoid | ✅ Do |
|----------|-------|
| Large PRs (>500 lines) | Small, focused PRs |
| Multiple concerns in one PR | One issue per PR |
| Skipping tests | Comprehensive tests |
| Hardcoded values | Externalize configuration |
| Force push to main | Rebase instead of merge |

---

## Review Process

1. CI runs automated checks
2. Maintainers review code
3. Address feedback promptly
4. PR merged when approved

---

## Quick Reference

```bash
# Setup
npm install && npx lefthook install

# Before PR
npm run build && npm run lint && npm run cli:test
```

**Quality over speed** — Write good code, tests, and documentation.
