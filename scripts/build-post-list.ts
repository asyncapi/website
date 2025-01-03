/* eslint-disable no-await-in-loop */
/* eslint-disable max-depth */
import type { PathLike } from 'fs';
import { readdir, readFile, stat, writeFile } from 'fs/promises';
import { pathExists } from 'fs-extra';
import frontMatter from 'gray-matter';
import { markdownToTxt } from 'markdown-to-txt';
import toc from 'markdown-toc';
import { basename, join, normalize, parse, posix, relative, sep } from 'path';
import readingTime from 'reading-time';

import type { Details, Result } from '@/types/scripts/build-posts-list';

import { addDocButtons, buildNavTree } from './build-docs';

let specWeight = 100;
const finalResult: Result = {
  docs: [],
  blog: [],
  about: [],
  docsTree: {}
};
const releaseNotes: (string | undefined)[] = [];
// Matches heading IDs in two formats:
// 1. {#my-heading-id}
// 2. <a name="my-heading-id">
const HEADING_ID_REGEX = /[\s]*(?:\{#([a-zA-Z0-9\-_]+)\}|<a[\s]+name="([a-zA-Z0-9\-_]+)")/;

export function slugifyToC(str: string) {
  if (typeof str !== 'string') return '';
  if (!str.trim()) return '';
  let slug = '';
  // Match heading IDs like {# myHeadingId}
  const idMatch = str.match(HEADING_ID_REGEX);
  const [, headingId, anchorId] = idMatch || [];

  slug = (headingId || anchorId || '').trim();

  // If no valid ID is found, return an empty string
  return slug;
}

function capitalize(text: string) {
  return text
    .split(/[\s-]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const addItem = (details: Details) => {
  if (!details || typeof details.slug !== 'string') {
    throw new Error('Invalid details object provided to addItem');
  }
  const sectionMap: {
    [key: string]: 'docs' | 'blog' | 'about';
  } = {
    '/docs': 'docs',
    '/blog': 'blog',
    '/about': 'about'
  };
  const section = Object.keys(sectionMap).find((key) => details.slug!.startsWith(key));

  if (section) {
    finalResult[sectionMap[section]].push(details);
  }
};

function getVersionDetails(slug: string, weight: number) {
  const fileBaseName = basename(slug);
  const versionName = fileBaseName.split('-')[0];

  return {
    title: versionName.startsWith('v') ? capitalize(versionName.slice(1)) : capitalize(versionName),
    weight
  };
}
function handleSpecificationVersion(details: Details, fileBaseName: string) {
  const detailsObj = details;

  if (fileBaseName.includes('next-spec') || fileBaseName.includes('next-major-spec')) {
    detailsObj.isPrerelease = true;
    detailsObj.title += ' (Pre-release)';
  }
  if (fileBaseName.includes('explorer')) {
    detailsObj.title += ' - Explorer';
  }

  return detailsObj;
}
async function isDirectory(dir: PathLike) {
  return (await stat(dir)).isDirectory();
}

async function walkDirectories(
  directories: string[][],
  resultObj: Result,
  basePath: string,
  sectionTitle?: string,
  sectionId?: string | undefined,
  rootSectionId?: string | undefined,
  sectionWeight = 0
) {
  for (const dir of directories) {
    const directory = posix.normalize(dir[0]);
    const sectionSlug = dir[1] || '';
    const files = await readdir(directory);

    for (const file of files) {
      let details: Details;
      const fileName = normalize(join(directory, file));
      const fileNameWithSection = normalize(join(fileName, '_section.mdx'));
      const slug = `/${normalize(relative(basePath, fileName)).replace(/\\/g, '/')}`;
      const slugElements = slug.split('/');

      if (await isDirectory(fileName)) {
        if (await pathExists(fileNameWithSection)) {
          // Passing a second argument to frontMatter disables cache. See https://github.com/asyncapi/website/issues/1057
          details = frontMatter(await readFile(fileNameWithSection, 'utf-8'), {}).data as Details;
          details.title = details.title || capitalize(basename(fileName));
        } else {
          details = {
            title: capitalize(basename(fileName))
          };
        }
        details.isSection = true;
        if (slugElements.length > 3) {
          details.parent = slugElements[slugElements.length - 2];
          details.sectionId = slugElements[slugElements.length - 1];
        }
        if (!details.parent) {
          details.isRootSection = true;
          details.rootSectionId = slugElements[slugElements.length - 1];
        }
        details.sectionWeight = sectionWeight;
        details.slug = slug;
        addItem(details);
        const rootId = details.parent || details.rootSectionId;

        await walkDirectories(
          [[fileName, slug]],
          resultObj,
          basePath,
          details.title,
          details.sectionId,
          rootId,
          details.sectionWeight
        );
      } else if (file.endsWith('.mdx') && !fileName.endsWith(`${sep}_section.mdx`)) {
        const fileContent = await readFile(fileName, 'utf-8');
        // Passing a second argument to frontMatter disables cache. See https://github.com/asyncapi/website/issues/1057
        const { data, content } = frontMatter(fileContent, {});

        details = data as Details;
        details.toc = toc(content, { slugify: slugifyToC }).json;
        details.readingTime = Math.ceil(readingTime(content).minutes);
        details.excerpt = details.excerpt || markdownToTxt(content).substr(0, 200);
        details.sectionSlug = sectionSlug || slug.replace(/\.mdx$/, '');
        details.sectionWeight = sectionWeight;
        details.sectionTitle = sectionTitle;
        details.sectionId = sectionId;
        details.rootSectionId = rootSectionId;
        details.id = fileName.replace(/\\/g, '/');
        details.isIndex = fileName.endsWith(join('index.mdx'));
        details.slug = details.isIndex ? sectionSlug : slug.replace(/\.mdx$/, '');
        if (details.slug.includes('/reference/specification/') && !details.title) {
          const fileBaseName = basename(details.slug);
          const versionDetails = getVersionDetails(details.slug, specWeight--);

          details.title = versionDetails.title;
          details.weight = versionDetails.weight;

          if (releaseNotes.includes(details.title)) {
            details.releaseNoteLink = `/blog/release-notes-${details.title}`;
          }

          details = handleSpecificationVersion(details, fileBaseName);
        }

        // To create a list of available ReleaseNotes list, which will be used to add details.releaseNoteLink attribute.
        if (file.startsWith('release-notes') && dir[1] === '/blog') {
          const { name } = parse(file);
          const version = name.split('-').pop();

          releaseNotes.push(version);
        }

        addItem(details);
      }
    }
  }
}
// Builds a list of posts from the specified directories and writes it to a file
export async function buildPostList(
  postDirectories: string[][],
  basePath: string,
  writeFilePath: string
): Promise<void> {
  try {
    if (!basePath) {
      throw new Error('Error while building post list: basePath is required');
    }
    if (!writeFilePath) {
      throw new Error('Error while building post list: writeFilePath is required');
    }
    if (postDirectories.length === 0) {
      throw new Error('Error while building post list: postDirectories array is empty');
    }
    const normalizedBasePath = normalize(basePath);

    await walkDirectories(postDirectories, finalResult, normalizedBasePath);
    const treePosts = buildNavTree(finalResult.docs.filter((p) => p.slug!.startsWith('/docs/')));

    finalResult.docsTree = treePosts;
    finalResult.docs = addDocButtons(finalResult.docs, treePosts);
    await writeFile(writeFilePath, JSON.stringify(finalResult, null, '  '));
  } catch (error) {
    throw new Error(`Error while building post list: ${(error as Error).message}`, { cause: error });
  }
}
