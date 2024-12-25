const { readdir, stat, pathExists, readFile, writeFile } = require('fs-extra')
const { basename, join, normalize, sep, posix, relative, parse } = require('path')
const frontMatter = require('gray-matter')
const toc = require('markdown-toc')
const readingTime = require('reading-time')
const { markdownToTxt } = require('markdown-to-txt')
const { buildNavTree, addDocButtons } = require('./build-docs')

let specWeight = 100
const result = {
  docs: [],
  blog: [],
  about: [],
  docsTree: {}
}
const releaseNotes = []

const addItem = (details) => {
  if (!details || typeof details.slug !== 'string') {
    throw new Error('Invalid details object provided to addItem');
  }
  const sectionMap = {
    '/docs': 'docs',
    '/blog': 'blog',
    '/about': 'about'
  };
  const section = Object.keys(sectionMap).find(key => details.slug.startsWith(key));
  if (section) {
    result[sectionMap[section]].push(details);
  }
};

function getVersionDetails(slug, weight) {
  const fileBaseName = basename(slug);
  const versionName = fileBaseName.split('-')[0];
  return {
    title: versionName.startsWith('v')
      ? capitalize(versionName.slice(1))
      : capitalize(versionName),
    weight
  };
}

/**
 * Builds a list of posts from the specified directories and writes it to a file
 * @param {Array<Array<string>>} postDirectories - Array of [directory, slug] tuples
 * @param {string} basePath - Base path for resolving relative paths
 * @param {string} writeFilePath - Path where the output JSON will be written
 * @throws {Error} If required parameters are missing or if any operation fails
 * @returns {Promise<void>}
 */
async function buildPostList(postDirectories, basePath, writeFilePath) {
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
    const normalizedBasePath = normalize(basePath)
    await walkDirectories(postDirectories, result, normalizedBasePath)
    const treePosts = buildNavTree(result.docs.filter((p) => p.slug.startsWith('/docs/')))
    result.docsTree = treePosts
    result.docs = addDocButtons(result.docs, treePosts)
    await writeFile(writeFilePath, JSON.stringify(result, null, '  '))
  } catch (error) {
    throw new Error(`Error while building post list: ${error.message}`, { cause: error });
  }
}

function handleSpecificationVersion(details, fileBaseName) {
  if (fileBaseName.includes('next-spec') || fileBaseName.includes('next-major-spec')) {
    details.isPrerelease = true;
    details.title += " (Pre-release)";
  }
  if (fileBaseName.includes('explorer')) {
    details.title += " - Explorer";
  }
  return details;
}

async function walkDirectories(
  directories,
  resultObj,
  basePath,
  sectionTitle,
  sectionId,
  rootSectionId,
  sectionWeight = 0
) {
  for (let dir of directories) {
    const directory = posix.normalize(dir[0]);
    const sectionSlug = dir[1] || '';
    const files = await readdir(directory)

    for (let file of files) {
      let details;
      const fileName = normalize(join(directory, file));
      const fileNameWithSection = normalize(join(fileName, '_section.mdx'))
      const slug = `/${normalize(relative(basePath, fileName)).replace(/\\/g, '/')}`
      const slugElements = slug.split('/')

      if (await isDirectory(fileName)) {
        if (await pathExists(fileNameWithSection)) {
          // Passing a second argument to frontMatter disables cache. See https://github.com/asyncapi/website/issues/1057
          details = frontMatter(await readFile(fileNameWithSection, 'utf-8'), {}).data
          details.title = details.title || capitalize(basename(fileName))
        } else {
          details = {
            title: capitalize(basename(fileName)),
          }
        }
        details.isSection = true
        if (slugElements.length > 3) {
          details.parent = slugElements[slugElements.length - 2]
          details.sectionId = slugElements[slugElements.length - 1]
        }
        if (!details.parent) {
          details.isRootSection = true
          details.rootSectionId = slugElements[slugElements.length - 1]
        }
        details.sectionWeight = sectionWeight
        details.slug = slug
        addItem(details)
        const rootId = details.parent || details.rootSectionId
        await walkDirectories([[fileName, slug]], resultObj, basePath, details.title, details.sectionId, rootId, details.sectionWeight)
      } else if (file.endsWith('.mdx') && !fileName.endsWith(sep + '_section.mdx')) {
        const fileContent = await readFile(fileName, 'utf-8')
        // Passing a second argument to frontMatter disables cache. See https://github.com/asyncapi/website/issues/1057
        const { data, content } = frontMatter(fileContent, {})
        details = data
        details.toc = toc(content, { slugify: slugifyToC }).json
        details.readingTime = Math.ceil(readingTime(content).minutes)
        details.excerpt = details.excerpt || markdownToTxt(content).substr(0, 200)
        details.sectionSlug = sectionSlug || slug.replace(/\.mdx$/, '')
        details.sectionWeight = sectionWeight
        details.sectionTitle = sectionTitle
        details.sectionId = sectionId
        details.rootSectionId = rootSectionId
        details.id = fileName.replace(/\\/g, '/')
        details.isIndex = fileName.endsWith(join('index.mdx'))
        details.slug = details.isIndex ? sectionSlug : slug.replace(/\.mdx$/, '')
        if (details.slug.includes('/reference/specification/') && !details.title) {
          const fileBaseName = basename(details.slug)
          const versionDetails = getVersionDetails(details.slug, specWeight--);
          details.title = versionDetails.title;
          details.weight = versionDetails.weight;

          if (releaseNotes.includes(details.title)) {
            details.releaseNoteLink = `/blog/release-notes-${details.title}`
          }

          details = handleSpecificationVersion(details, fileBaseName);
        }

        // To create a list of available ReleaseNotes list, which will be used to add details.releaseNoteLink attribute.
        if (file.startsWith('release-notes') && dir[1] === '/blog') {
          const { name } = parse(file);
          const version = name.split('-').pop();
          releaseNotes.push(version);
        }

        addItem(details)
      }
    }
  }
}

// Matches heading IDs in two formats:
// 1. {#my-heading-id}
// 2. <a name="my-heading-id">
const HEADING_ID_REGEX = /[\s]*(?:\{#([a-zA-Z0-9\-_]+)\}|<a[\s]+name="([a-zA-Z0-9\-_]+)")/;

/**
 * Extracts heading IDs from markdown headings
 * @param {string} str - The heading text containing potential ID
 * @returns {string} The extracted ID or empty string if no valid ID found
 */
function slugifyToC(str) {
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

async function isDirectory(dir) {
  return (await stat(dir)).isDirectory()
}

function capitalize(text) {
  return text.split(/[\s-]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

module.exports = { slugifyToC, buildPostList, addItem }
