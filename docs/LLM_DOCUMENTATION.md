# LLM Documentation - Maintenance Guide

This guide explains how to maintain the LLM-friendly documentation files (`llms.txt`, `llms-full.txt`, `sitemap.xml`) for the AsyncAPI website.

## Overview

The AsyncAPI website provides LLM-optimized documentation following the [llms.txt standard](https://llmstxt.org/) to help AI assistants generate correct AsyncAPI v3 documents.

## Files Generated

- **`public/llms.txt`**: Structured markdown index of key documentation
- **`public/llms-full.txt`**: Expanded version with additional context
- **`public/sitemap.xml`**: Standard XML sitemap for search engines and crawlers
- **`public/schemas/3.0.0.json`**: AsyncAPI v3 JSON Schema

## Build Scripts

### Generate LLM Files

```bash
npm run generate:llms
```

This script ([`scripts/build-llms-txt.ts`](../scripts/build-llms-txt.ts)):
- Generates `llms.txt` with organized documentation links
- Creates `llms-full.txt` with expanded content
- Copies AsyncAPI JSON schemas to `public/schemas/`

### Generate Sitemap

```bash
npm run generate:sitemap
```

This script ([`scripts/build-sitemap.ts`](../scripts/build-sitemap.ts)):
- Generates `sitemap.xml` with all important pages
- Sets appropriate priorities and update frequencies

### Validate Format

```bash
npx tsx scripts/test-llms-txt.ts
```

This validation script checks:
- ✓ llms.txt follows the specification
- ✓ All required files exist
- ✓ Proper markdown formatting
- ✓ Correct link structure

## Automatic Generation

These files are automatically generated during the build process:

```bash
npm run build
```

The `build-scripts` command includes both `generate:llms` and `generate:sitemap`:
```json
{
  "build-scripts": "npm run build:pages && npm run lint:mdx && npm run build:posts && npm run generate:llms && npm run generate:sitemap"
}
```

## When to Update

### Adding New Documentation

When you add new important documentation pages:

1. **Edit `scripts/build-llms-txt.ts`**:
   - Add the new page to the appropriate section in the `sections` array
   - Choose the right category (Core Specification, Tutorials, etc.)
   - Add a helpful description

2. **Edit `scripts/build-sitemap.ts`**:
   - Add the new URL to the `urls` array
   - Set appropriate `priority` (0.0 to 1.0)
   - Set `changefreq` (daily, weekly, monthly, yearly)

3. **Regenerate and validate**:
   ```bash
   npm run generate:llms
   npm run generate:sitemap
   npx tsx scripts/test-llms-txt.ts
   ```

### Updating Priorities

If documentation structure changes:
- Update priorities in `build-sitemap.ts`
- v3 spec should always have `priority: 1.0`
- v2 spec should have lower priority (currently `0.5`)
- Migration guides should be high priority (`0.9`)

## llms.txt Structure

The file must follow this structure:

```markdown
# AsyncAPI

> Brief description in a blockquote

Detailed explanation paragraphs (optional)

## Section Name
- [Link Title](https://url): Optional description
- [Another Link](https://url): Optional description

## Optional
- [Secondary Resource](https://url): For less critical content
```

**Rules**:
- ✓ Must start with H1 (`# AsyncAPI`)
- ✓ Must have blockquote description (`> ...`)
- ✓ Organize content with H2 sections (`## Section`)
- ✓ Use markdown links: `[title](url)`
- ✓ Add descriptions after `:` for clarity
- ✓ Include "Optional" section for secondary resources
- ✓ All URLs must be absolute

## Best Practices

### For llms.txt

1. **Keep it concise**: The main file should be a quick reference
2. **Prioritize v3**: Always emphasize v3 over v2
3. **Add context**: Include descriptions that help LLMs understand what to use
4. **Use "Optional" wisely**: Put legacy/secondary content there

### For sitemap.xml

1. **Update frequencies**: 
   - `daily` for blog/news
   - `weekly` for main sections
   - `monthly` for documentation
   - `yearly` for old specs

2. **Priority guidance**:
   - `1.0` - Homepage, current spec
   - `0.9` - Major documentation, migration guides
   - `0.8` - Tutorials, tools
   - `0.7` - Concepts, community
   - `0.5` and below - Legacy content

## Validation Checklist

Before committing changes:

- [ ] Run `npm run generate:llms`
- [ ] Run `npm run generate:sitemap`
- [ ] Run `npx tsx scripts/test-llms-txt.ts`
- [ ] Check that all validations pass
- [ ] Review generated `public/llms.txt` manually
- [ ] Verify links are correct and descriptions are helpful

## Troubleshooting

### "File not found" errors

Make sure you run the generation scripts:
```bash
npm run generate:llms
npm run generate:sitemap
```

### Validation fails

1. Check the error messages from `test-llms-txt.ts`
2. Ensure the structure follows the specification
3. Verify all links use absolute URLs
4. Make sure H1, blockquote, and H2 sections exist

### Build fails

If the build fails after adding these scripts:
1. Check that TypeScript compiles: `npx tsc --noEmit`
2. Verify file paths are correct
3. Ensure `public/` directory exists

## Submission to Directories

After deploying to production, submit to LLM directories:

1. **llmstxt.site**: https://llmstxt.site/submit
2. **directory.llmstxt.cloud**: https://directory.llmstxt.cloud/

Provide:
- URL: `https://www.asyncapi.com/llms.txt`
- Description: "AsyncAPI specification for event-driven APIs"

## Future Enhancements

Potential improvements:

1. **Full content expansion**: Make `llms-full.txt` include complete documentation
2. **Markdown versions**: Generate `.md` versions of all pages (e.g., `page.html.md`)
3. **Automated validation**: Add CI check to validate llms.txt on every PR
4. **Dynamic generation**: Auto-detect new docs and add to llms.txt

## Support

For questions or issues:
- GitHub Issue: https://github.com/asyncapi/website/issues/4408
- AsyncAPI Slack: #11-website channel
- Standard: https://llmstxt.org/
