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
    result["docs"].push(details)
  else if (details.slug.startsWith('/blog'))
    result["blog"].push(details)
  else if (details.slug.startsWith('/about'))
    result["about"].push(details)
};

async function buildPostList(postDirectories, basePath, writeFilePath) {
  try {

    if (!basePath || !writeFilePath) {
            throw new Error('Error while building post list: basePath and writeFilePath are required');
    }

    if (postDirectories.length === 0) {
      throw new Error('Error while building post list: No post directories provided');
    }
    const normalizedBasePath = normalize(basePath)
    await walkDirectories(postDirectories, result, normalizedBasePath)
    const treePosts = buildNavTree(result["docs"].filter((p) => p.slug.startsWith('/docs/')))
    result["docsTree"] = treePosts
    result["docs"] = addDocButtons(result["docs"], treePosts)
    await writeFile(writeFilePath, JSON.stringify(result, null, '  '))
  } catch (error) {
    throw new Error(`Error while building post list: ${error.message}`, { cause: error });
  }
}

async function walkDirectories(directories, resultObj, basePath, sectionTitle, sectionId, rootSectionId, sectionWeight = 0) {
  for (let dir of directories) {
    let directory = posix.normalize(dir[0]);
    let sectionSlug = dir[1] || '';
    let files = await readdir(directory)

    for (let file of files) {
      let details;
      const fileName = posix.join(directory, file);
      const fileNameWithSection = posix.join(fileName, '_section.mdx')
      const normalizedSlug = posix.join('/', relative(basePath, fileName))
      const slug = normalizedSlug.replace(/\\/g,'/')
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
          const fileBaseName = basename(data.slug)  // ex. v2.0.0 | v2.1.0-next-spec.1
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

function slugifyToC(str) {
  let slug
  // Try to match heading ids like {# myHeadingId}
  const headingIdMatch = str.match(/[\s]?\{\#([\w\d\-_]+)\}/)
  if (headingIdMatch && headingIdMatch.length >= 2) {
    slug = headingIdMatch[1]
  } else {
    // Try to match heading ids like {<a name="myHeadingId"/>}
    const anchorTagMatch = str.match(/[\s]*<a[\s]+name="([\w\d\s\-_]+)"/)
    if (anchorTagMatch && anchorTagMatch.length >= 2) slug = anchorTagMatch[1]
  }
  return slug || slugify(str, { firsth1: true, maxdepth: 6 })
}

async function isDirectory(dir) {
  return (await stat(dir)).isDirectory()
}

function capitalize(text) {
  return text.split(/[\s\-]/g).map(word => `${word[0].toUpperCase()}${word.substr(1)}`).join(' ')
}

module.exports = { slugifyToC, buildPostList }
