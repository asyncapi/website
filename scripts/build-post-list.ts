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

/**
 * Extracts a slug from a markdown heading string for table of contents usage.
 *
 * This function searches for a valid heading ID in the form `{#someId}` within the input string
 * and returns the trimmed ID as the slug. If the input is not a string, is empty, or does not
 * contain a valid heading ID, an empty string is returned.
 *
 * @param str - The input markdown string that may contain a heading ID.
 * @returns The extracted slug used for table of contents, or an empty string if no valid ID is found.
 */
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

/**
 * Capitalizes the first letter of each word in the provided string.
 *
 * This function splits the text on whitespace and hyphen characters, capitalizes the first letter of each segment, and then joins them with a space.
 *
 * @param text - The string to transform.
 * @returns The transformed string with each word's initial letter capitalized.
 */
function capitalize(text: string) {
  return text
    .split(/[\s-]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Adds an item to the final result based on its details.
 *
 * @param {Details} details - The details of the item to add.
 * @throws {Error} - Throws an error if the details object is invalid.
 */
export const addItem = (details: Details, resultObj: Result) => {
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
    resultObj[sectionMap[section]].push(details);
  }
};

/**
 * Extracts version information from a slug and associates it with a weight.
 *
 * This function parses the provided slug to obtain its basename and extracts the first segment (delimited by a hyphen) as the version identifier.
 * If the identifier begins with a "v", that prefix is removed prior to capitalization.
 * The resulting version title, along with the original weight, is returned in an object.
 *
 * @param slug - A string representing the slug from which the version is derived.
 * @param weight - A numerical value representing the version's weight.
 * @returns An object containing:
 *   - title: The formatted version title.
 *   - weight: The provided weight.
 */
function getVersionDetails(slug: string, weight: number) {
  const fileBaseName = basename(slug);
  const versionName = fileBaseName.split('-')[0];

  return {
    title: versionName.startsWith('v') ? capitalize(versionName.slice(1)) : capitalize(versionName),
    weight
  };
}

/**
 * Updates a details object by appending version indicators to its title and marking it as a pre-release when applicable.
 *
 * Specifically, if the file base name contains "next-spec" or "next-major-spec", the function sets the pre-release flag
 * and appends " (Pre-release)" to the title. Additionally, if the file base name includes "explorer", it appends " - Explorer"
 * to the title.
 *
 * @param details - The documentation item's details object.
 * @param fileBaseName - The base name of the file, used to determine version markers.
 * @returns The updated details object with modified title and version flags.
 */
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

/**
 * Determines whether the provided path refers to a directory.
 *
 * @param dir - The file system path to check.
 * @returns A promise that resolves to true if the path is a directory, or false otherwise.
 */
async function isDirectory(dir: PathLike) {
  return (await stat(dir)).isDirectory();
}

/**
 * Recursively traverses an array of directory tuples to process markdown files and subdirectories,
 * extracting metadata and building a hierarchical result structure.
 *
 * For each directory tuple, where the first element is the directory path and the second an optional
 * section slug, the function reads contained files. Subdirectories with a '_section.mdx' file have their
 * metadata extracted to form section details, while markdown files (ending in .mdx but not with '_section.mdx')
 * are parsed for front matter, table of contents, reading time, and excerpt information. Special processing
 * applies for specification and release note files.
 *
 * @param directories - An array of directory tuples, each containing a directory path and an optional section slug.
 * @param resultObj - The object to accumulate processed documentation, blog posts, and section details.
 * @param basePath - The base path for resolving relative file paths in the project.
 * @param sectionTitle - The title of the current section, used to annotate content files.
 * @param sectionId - The identifier for the current section in a nested hierarchy.
 * @param rootSectionId - The identifier for the root section in the hierarchy.
 * @param sectionWeight - A numeric weight for ordering the section; defaults to 0.
 *
 * @throws {Error} When a file system operation or directory traversal fails.
 */
async function walkDirectories(
  directories: string[][],
  resultObj: Result,
  basePath: string,
  sectionTitle?: string,
  sectionId?: string | undefined,
  rootSectionId?: string | undefined,
  sectionWeight = 0
) {
  try {
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
          addItem(details, finalResult);
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

          addItem(details, finalResult);
        }
      }
    }
  } catch (error) {
    throw new Error(`Error while walking directories: ${(error as Error).message}`);
  }
}
// Builds a list of posts from the specified directories and writes it to a file
/**
 * Asynchronously builds a structured post list from nested directories and writes the resulting JSON to a file.
 *
 * The function validates that the base directory, write file path, and post directories are provided. It then
 * normalizes the base path, recursively processes the provided directories to extract Markdown metadata, constructs
 * a navigation tree from documentation posts, augments these posts with additional controls, and finally writes the
 * complete result as a formatted JSON string to the specified file.
 *
 * @param postDirectories - A nested array of directories to search for posts.
 * @param basePath - The base directory path used to resolve file locations.
 * @param writeFilePath - The file path where the final JSON output will be written.
 * @returns A promise that resolves when the post list has been successfully built and written.
 *
 * @throws {Error} When required inputs are missing or an error occurs during directory traversal or file writing.
 */
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
