const { readdir, stat, pathExists, readFile, writeFile } = require('fs-extra')
const { basename, join, normalize, sep, posix, relative, extname } = require('path')
const frontMatter = require('gray-matter')
const toc = require('markdown-toc')
const { slugify } = require('markdown-toc/lib/utils')
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
  if (details.slug.startsWith('/docs'))
    result.docs.push(details)
  else if (details.slug.startsWith('/blog'))
    result.blog.push(details)
  else if (details.slug.startsWith('/about'))
    result.about.push(details)
};

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

    if (!basePath || !writeFilePath) {
      const missing = [
        !basePath && 'basePath',
        !writeFilePath && 'writeFilePath'
        ].filter(Boolean);
        throw new Error(`Error while building post list: ${missing.join(' and ')} ${missing.length > 1 ? 'are' : 'is'} required`);
    }

    if (postDirectories.length === 0) {
      throw new Error('Error while building post list: No post directories provided');
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
    const files = await Promise.all([
      readdir(directory),
      pathExists(directory)
      ]).then(([files]) => files)

    for (let file of files) {
      let details;
      const fileName = normalize(join(directory, file));
      const fileNameWithSection = normalize(join(fileName, '_section.mdx'))
      const slug = '/' + normalize(relative(basePath, fileName)).replace(/\\/g, '/')
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
          const fileBaseName = basename(details.slug)  // ex. v2.0.0 | v2.1.0-next-spec.1
          const versionName = fileBaseName.split('-')[0] // v2.0.0 | v2.1.0
          details.weight = specWeight--

          if (versionName.startsWith('v')) {
            details.title = capitalize(versionName.slice(1))
          } else {
            details.title = capitalize(versionName)
          }

          if (releaseNotes.includes(details.title)) {
            details.releaseNoteLink = `/blog/release-notes-${details.title}`
          }

          if (fileBaseName.includes('next-spec') || fileBaseName.includes('next-major-spec')) {
            details.isPrerelease = true
            // this need to be separate because the `-` in "Pre-release" will get removed by `capitalize()` function
            details.title += " (Pre-release)"
          }
          if (fileBaseName.includes('explorer')) {
            details.title += " - Explorer"
          }
        }

        // To create a list of available ReleaseNotes list, which will be used to add details.releaseNoteLink attribute.
        if (file.startsWith("release-notes") && dir[1] === "/blog") {
          const fileNameWithoutExtension = basename(file, extname(file))
          // removes the file extension. For example, release-notes-2.1.0.md -> release-notes-2.1.0
          const version = fileNameWithoutExtension.slice(fileNameWithoutExtension.lastIndexOf("-") + 1)

          // gets the version from the name of the releaseNote .md file (from /blog). For example, version = 2.1.0 if fileNameWithoutExtension = release-notes-2.1.0
          releaseNotes.push(version)
          // releaseNotes is the list of all available releaseNotes
        }

        addItem(details)
      }
    }
  }
}

/**
 * Extracts heading IDs from markdown headings
 * @param {string} str - The heading text containing potential ID
 * @returns {string} The extracted ID or empty string if no valid ID found
 */
function slugifyToC(str) {
  if (typeof str !== 'string') return '';
  let slug = '';

  // Match heading IDs like {# myHeadingId}
  const idMatch = str.match(/[\s]*(?:\{#([a-zA-Z0-9\-_]+)\}|<a[\s]+name="([a-zA-Z0-9\-_]+)")/);
  const [, headingId, anchorId] = idMatch || [];
  slug = (headingId || anchorId || '').trim();

  // If no valid ID is found, return an empty string
  return slug;
}

async function isDirectory(dir) {
  return (await stat(dir)).isDirectory()
}

function capitalize(text) {
  return text.replace(/(?:^|\s|-)([a-z])/g, (_, char) => char.toUpperCase())
}

module.exports = { slugifyToC, buildPostList }
