import { existsSync, readFileSync } from 'node:fs';
import { mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { NavTree, NavTreeItem } from '@/types/scripts/build-docs';
import type { GenerateLlmsOptions, LlmsContentKind, LlmsSection } from '@/types/scripts/build-llms';
import type { Details, Result } from '@/types/scripts/build-posts-list';

import { convertDocPosts } from './build-docs';
import {
  GENERATED_ROOT_FILES,
  isOptionalSection,
  LATEST_SPEC_SLUG,
  LLMS_DETAILS,
  LLMS_SUMMARY,
  LLMS_TITLE,
  MARKDOWN_SOURCE_DIR,
  parseLatestSpecSlug,
  PUBLIC_DIR,
  replaceLatestMarkdownRedirect,
  shouldIncludeInLlmsFull,
  SITE_BASE_URL
} from './llms/config';
import { convertMarkdown } from './llms/convert-markdown';
import { canonicalMarkdownUrl, markdownPageHint, postIdToMarkdownSource, slugToPublicFile } from './llms/urls';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);
const defaultSiteRoot = resolve(currentDirPath, '..');

/**
 * Capitalizes the first character of a section id.
 *
 * @param value - section id
 */
function capitalize(value: string): string {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Weight used to keep llms.txt section order aligned with the docs sidebar.
 *
 * @param node - root docsTree node
 */
function sectionWeight(node: NavTreeItem): number {
  return node.item.sectionWeight ?? node.item.weight ?? 0;
}

/**
 * Type guard for a docsTree node that has an item and children.
 *
 * @param node - docsTree value
 */
function isNavTreeItem(node: NavTree[string]): node is NavTreeItem {
  return Boolean(node && typeof node === 'object' && 'item' in node);
}

/**
 * Maps a section id to the inventory kind used for llms-full filtering.
 *
 * @param sectionId - section identifier
 */
function kindForSection(sectionId: string): LlmsContentKind {
  if (sectionId === 'blog') {
    return 'blog';
  }

  if (sectionId === 'about') {
    return 'about';
  }

  return 'docs';
}

/**
 * Sorts blog posts newest first.
 *
 * @param posts - blog pages
 */
function sortBlogPosts(posts: Details[]): Details[] {
  return [...posts].sort((left, right) => {
    const leftDate = left.date ? new Date(left.date).getTime() : 0;
    const rightDate = right.date ? new Date(right.date).getTime() : 0;

    return rightDate - leftDate;
  });
}

/**
 * Truncates an excerpt to a single short sentence for llms.txt notes.
 *
 * @param excerpt - raw excerpt from posts.json
 */
export function oneSentenceExcerpt(excerpt?: string): string {
  if (!excerpt) {
    return '';
  }

  const cleaned = excerpt
    .replace(/import \S+ from ['"][^'"]+['"];?/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const sentence = cleaned.split(/(?<=[.!?])\s+/)[0] || cleaned;

  if (!sentence) {
    return '';
  }

  if (sentence.length <= 180) {
    return sentence;
  }

  return `${sentence.slice(0, 177).trim()}...`;
}

/**
 * Formats one llms.txt list item.
 *
 * @param page - indexed page
 * @param baseUrl - site origin
 */
function formatLlmsItem(page: Details, baseUrl: string): string {
  const title = page.title || page.slug || 'Untitled';
  const url = canonicalMarkdownUrl(page.slug || '', baseUrl);
  const note = oneSentenceExcerpt(page.excerpt);

  if (!note) {
    return `- [${title}](${url})`;
  }

  return `- [${title}](${url}): ${note}`;
}

/**
 * Reads a file and returns undefined when it does not exist.
 *
 * @param filePath - absolute path
 */
function readSourceFile(filePath: string): string | undefined {
  if (!existsSync(filePath)) {
    return undefined;
  }

  return readFileSync(filePath, 'utf8');
}

/**
 * Returns true when a slug should be listed (or when no allow-list is in use).
 *
 * @param slug - page slug
 * @param includedSlugs - optional set of slugs that have generated markdown
 */
function isIncludedSlug(slug: string | undefined, includedSlugs?: Set<string>): boolean {
  if (!includedSlugs) {
    return true;
  }

  return Boolean(slug && includedSlugs.has(slug));
}

/**
 * Builds llms.txt sections from the docs sidebar tree.
 *
 * @param docsTree - navigation tree from posts.json
 * @param includedSlugs - optional allow-list of generated page slugs
 */
function sectionsFromDocsTree(docsTree: NavTree = {}, includedSlugs?: Set<string>): LlmsSection[] {
  const roots = Object.entries(docsTree)
    .filter(([, node]) => isNavTreeItem(node))
    .map(([id, node]) => ({ id, node: node as NavTreeItem }))
    .sort((left, right) => sectionWeight(left.node) - sectionWeight(right.node));

  return roots.map(({ id, node }) => {
    const flattened = convertDocPosts(node);
    const pages = flattened.filter(
      (page) => page.slug && !page.isSection && !page.isRootSection && isIncludedSlug(page.slug, includedSlugs)
    );

    return {
      id,
      title: node.item.title || capitalize(id),
      optional: isOptionalSection(id),
      pages
    };
  });
}

/**
 * Deletes generated `*.md` files without removing other public assets.
 *
 * @param directory - directory that may contain generated markdown
 * @param recursive - when true, also walk nested directories (docs)
 */
async function deleteMarkdownFilesInDirectory(directory: string, recursive: boolean): Promise<void> {
  try {
    const stats = await stat(directory);

    if (!stats.isDirectory()) {
      return;
    }
  } catch {
    return;
  }

  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(directory, entry.name);

      if (entry.isDirectory()) {
        if (recursive) {
          await deleteMarkdownFilesInDirectory(fullPath, true);
        }

        return;
      }

      if (entry.name.endsWith('.md')) {
        await rm(fullPath, { force: true });
      }
    })
  );
}

/**
 * Deletes previously generated LLM markdown artifacts.
 *
 * @param publicDir - public output directory
 */
async function wipeGeneratedOutputs(publicDir: string): Promise<void> {
  await Promise.all(GENERATED_ROOT_FILES.map((file) => rm(join(publicDir, file), { force: true })));
  await deleteMarkdownFilesInDirectory(join(publicDir, 'docs'), true);
  await deleteMarkdownFilesInDirectory(join(publicDir, 'blog'), false);
}

/**
 * Resolves the authored markdown file for a post.
 * Tries the posts.json id, a folder index.md twin, then slug-based paths.
 *
 * @param page - indexed page
 * @param markdownDir - markdown/ directory
 * @param siteRoot - repository root
 */
function resolveMarkdownSource(page: Details, markdownDir: string, siteRoot: string): string | undefined {
  const candidates: string[] = [];

  if (page.id) {
    const fromId = join(siteRoot, postIdToMarkdownSource(page.id.replaceAll('\\', '/')));

    candidates.push(fromId, join(fromId.replace(/\.md$/, ''), 'index.md'));
  }

  if (page.slug) {
    const relativePath = page.slug.startsWith('/') ? page.slug.slice(1) : page.slug;

    candidates.push(join(markdownDir, `${relativePath}.md`), join(markdownDir, relativePath, 'index.md'));
  }

  return candidates.find((candidate) => existsSync(candidate));
}

/**
 * Narrows a page+source pair to entries that have both a slug and a source file.
 *
 * @param entry - candidate page and resolved path
 */
function hasMarkdownSource(entry: {
  page: Details;
  sourcePath: string | undefined;
}): entry is { page: Details & { slug: string }; sourcePath: string } {
  return Boolean(entry.page.slug && entry.sourcePath);
}

/**
 * Collects routable docs, blog, and about pages.
 *
 * @param posts - posts.json inventory
 */
function collectContentPages(posts: Result): Details[] {
  const fromDocs = (posts.docs || []).filter((page) => page.slug && !page.isSection);
  const fromBlog = (posts.blog || []).filter((page) => page.slug && !page.isSection);
  const fromAbout = (posts.about || []).filter((page) => page.slug && !page.isSection);

  return [...fromDocs, ...fromBlog, ...fromAbout];
}

/**
 * Loads config/posts.json from the site root.
 *
 * @param siteRoot - repository root
 */
async function loadPosts(siteRoot: string): Promise<Result> {
  const raw = await readFile(join(siteRoot, 'config', 'posts.json'), 'utf8');

  return JSON.parse(raw) as Result;
}

/**
 * Keeps `/docs/reference/specification/latest.md` on the same version as the HTML `latest` redirect.
 *
 * @param siteRoot - repository root that contains public/_redirects
 */
async function syncLatestMarkdownRedirect(siteRoot: string): Promise<void> {
  const redirectsPath = join(siteRoot, 'public/_redirects');

  if (!existsSync(redirectsPath)) {
    return;
  }

  const original = await readFile(redirectsPath, 'utf8');
  const latestSlug = parseLatestSpecSlug(original, LATEST_SPEC_SLUG);
  const updated = replaceLatestMarkdownRedirect(original, latestSlug);

  if (updated !== original) {
    await writeFile(redirectsPath, updated, 'utf8');
  }
}

/**
 * Groups indexed pages into llms.txt sections using docsTree order.
 *
 * @param posts - posts.json inventory
 * @param includedSlugs - optional allow-list of generated page slugs
 */
export function collectLlmsSections(posts: Result, includedSlugs?: Set<string>): LlmsSection[] {
  const treeSections = sectionsFromDocsTree(posts.docsTree, includedSlugs);
  const seen = new Set(treeSections.flatMap((section) => section.pages.map((page) => page.slug)));
  const welcomePage = (posts.docs || []).find(
    (page) => page.slug === '/docs' && !page.isSection && isIncludedSlug(page.slug, includedSlugs)
  );

  if (welcomePage?.slug) {
    seen.add(welcomePage.slug);

    const welcomeSection = treeSections.find((section) => section.id === 'welcome');

    if (welcomeSection) {
      welcomeSection.pages.unshift(welcomePage);
    } else {
      treeSections.unshift({
        id: 'welcome',
        title: welcomePage.title || 'Welcome',
        optional: false,
        pages: [welcomePage]
      });
    }
  }

  const leftovers = (posts.docs || []).filter(
    (page) => page.slug && !page.isSection && !seen.has(page.slug) && isIncludedSlug(page.slug, includedSlugs)
  );

  leftovers.forEach((page) => {
    const id = page.rootSectionId || (page.slug === '/docs' ? 'welcome' : 'docs');
    const existing = treeSections.find((section) => section.id === id);

    if (existing) {
      existing.pages.push(page);

      return;
    }

    treeSections.push({
      id,
      title: page.sectionTitle || capitalize(id),
      optional: isOptionalSection(id),
      pages: [page]
    });
  });

  const aboutPages = (posts.about || []).filter(
    (page) => page.slug && !page.isSection && isIncludedSlug(page.slug, includedSlugs)
  );

  if (aboutPages.length > 0) {
    treeSections.push({
      id: 'about',
      title: 'About',
      optional: false,
      pages: aboutPages
    });
  }

  const blogPages = sortBlogPosts(
    (posts.blog || []).filter((page) => page.slug && !page.isSection && isIncludedSlug(page.slug, includedSlugs))
  );

  if (blogPages.length > 0) {
    treeSections.push({
      id: 'blog',
      title: 'Blog',
      optional: true,
      pages: blogPages
    });
  }

  return treeSections.filter((section) => section.pages.length > 0);
}

/**
 * Builds the llms.txt index from indexed posts.
 *
 * @param posts - posts.json inventory
 * @param baseUrl - site origin
 */
export function buildLlmsTxt(posts: Result, baseUrl: string = SITE_BASE_URL, includedSlugs?: Set<string>): string {
  const sections = collectLlmsSections(posts, includedSlugs);
  const lines = [`# ${LLMS_TITLE}`, '', `> ${LLMS_SUMMARY}`, '', LLMS_DETAILS, ''];

  sections
    .filter((section) => !section.optional)
    .forEach((section) => {
      lines.push(`## ${section.title}`, '');
      section.pages.forEach((page) => {
        lines.push(formatLlmsItem(page, baseUrl));
      });
      lines.push('');
    });

  const optionalPages = sections.filter((section) => section.optional).flatMap((section) => section.pages);

  lines.push('## Optional', '');
  optionalPages.forEach((page) => {
    lines.push(formatLlmsItem(page, baseUrl));
  });
  lines.push(`- [Blog RSS](${baseUrl}/rss.xml): AsyncAPI Initiative Blog RSS Feed.`, '');

  return `${lines.join('\n').trim()}\n`;
}

/**
 * Concatenates core product docs into llms-full.txt.
 *
 * @param posts - posts.json inventory
 * @param convertedPages - slug to cleaned markdown body
 * @param baseUrl - site origin
 */
export function buildLlmsFullTxt(
  posts: Result,
  convertedPages: Map<string, string>,
  baseUrl: string = SITE_BASE_URL,
  includedSlugs?: Set<string>
): string {
  const sections = collectLlmsSections(posts, includedSlugs);
  const chunks = [
    `# ${LLMS_TITLE} documentation`,
    '',
    `> ${LLMS_SUMMARY}`,
    '',
    'Concatenated core docs. Community and blog pages are listed under Optional in /llms.txt.',
    ''
  ];

  sections.forEach((section) => {
    const kind = kindForSection(section.id);

    section.pages.forEach((page) => {
      if (!shouldIncludeInLlmsFull(page, kind) || !page.slug) {
        return;
      }

      const body = convertedPages.get(page.slug) || '';
      const title = page.title || page.slug;

      chunks.push('---', '', `# ${title}`, `Source: ${canonicalMarkdownUrl(page.slug, baseUrl)}`, '', body, '');
    });
  });

  return `${chunks.join('\n').trim()}\n`;
}

/**
 * Writes llms.txt, llms-full.txt, and per-page markdown twins into public/.
 *
 * @param options - optional posts inventory and directories (defaults to repo paths)
 */
export async function generateLlmsFiles(options: GenerateLlmsOptions = {}): Promise<void> {
  try {
    const siteRoot = options.siteRoot || defaultSiteRoot;
    const markdownDir = options.markdownDir || join(siteRoot, MARKDOWN_SOURCE_DIR);
    const publicDir = options.publicDir || join(siteRoot, PUBLIC_DIR);

    await syncLatestMarkdownRedirect(siteRoot);
    const posts = options.posts || (await loadPosts(siteRoot));
    const contentPages = collectContentPages(posts);
    const pagesWithSources = contentPages
      .map((page) => ({
        page,
        sourcePath: resolveMarkdownSource(page, markdownDir, siteRoot)
      }))
      .filter(hasMarkdownSource);
    const knownMarkdownSlugs = new Set(pagesWithSources.map((entry) => entry.page.slug));

    if (pagesWithSources.length === 0) {
      throw new Error('No markdown sources found for LLM docs generation');
    }

    await wipeGeneratedOutputs(publicDir);
    await mkdir(publicDir, { recursive: true });

    const convertedPages = new Map<string, string>();
    const readFragment = (repoPath: string) => readSourceFile(join(siteRoot, repoPath));

    await Promise.all(
      pagesWithSources.map(async ({ page, sourcePath }) => {
        const source = await readFile(sourcePath, 'utf8');
        const converted = convertMarkdown(source, {
          title: page.title,
          slug: page.slug,
          knownMarkdownSlugs,
          readFragment,
          siteBaseUrl: SITE_BASE_URL
        });

        convertedPages.set(page.slug, converted);

        const outputPath = slugToPublicFile(page.slug, publicDir);
        const fileBody = `${markdownPageHint(page.slug)}\n\n${converted}\n`;

        await mkdir(dirname(outputPath), { recursive: true });
        await writeFile(outputPath, fileBody, 'utf8');
      })
    );

    await writeFile(join(publicDir, 'llms.txt'), buildLlmsTxt(posts, SITE_BASE_URL, knownMarkdownSlugs), 'utf8');
    await writeFile(
      join(publicDir, 'llms-full.txt'),
      buildLlmsFullTxt(posts, convertedPages, SITE_BASE_URL, knownMarkdownSlugs),
      'utf8'
    );
  } catch (error) {
    throw new Error(`Error while generating LLM docs files: ${(error as Error).message}`, { cause: error });
  }
}
