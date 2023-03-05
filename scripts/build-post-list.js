const { readdirSync, statSync, existsSync, readFileSync, writeFileSync } = require('fs')
const { resolve, basename } = require('path')
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
  jobs: [],
  docsTree: {}
}
const basePath = 'pages'
const postDirectories = [
  [`${basePath}/docs`, '/docs'],
  [`${basePath}/blog`, '/blog'],
  [`${basePath}/about`, '/about'],
  [`${basePath}/jobs`, '/jobs'],
]

const addItem = (details) => {
  if(details.slug.startsWith('/docs'))
    result["docs"].push(details)
  else if(details.slug.startsWith('/blog'))
    result["blog"].push(details)
  else if(details.slug.startsWith('/about'))
    result["about"].push(details)
  else if(details.slug.startsWith('/jobs'))
    result["jobs"].push(details)
  else {}
}

module.exports = async function buildPostList() {
  walkDirectories(postDirectories, result)
  const treePosts = buildNavTree(result["docs"].filter((p) => p.slug.startsWith('/docs/')))
  result["docsTree"] = treePosts
  result["docs"] = addDocButtons(result["docs"], treePosts)
  if (process.env.NODE_ENV === 'production') {
    // console.log(inspect(result, { depth: null, colors: true }))
  }
  writeFileSync(resolve(__dirname, '..', 'config', 'posts.json'), JSON.stringify(result, null, '  '))
}

function walkDirectories(directories, result, sectionWeight = 0, sectionTitle, sectionId, rootSectionId) {
  for (let dir of directories) {
    let directory = dir[0]
    let sectionSlug = dir[1] || ''
    let files = readdirSync(directory);

    for (let file of files) {
      let details
      const fileName = [directory, file].join('/')
      const fileNameWithSection = [fileName, '_section.md'].join('/')
      const slug = fileName.replace(new RegExp(`^${basePath}`), '')
      const slugElements = slug.split('/');
      if (isDirectory(fileName)) {
        if (existsSync(fileNameWithSection)) {
          // Passing a second argument to frontMatter disables cache. See https://github.com/asyncapi/website/issues/1057
          details = frontMatter(readFileSync(fileNameWithSection, 'utf-8'), {}).data
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
        walkDirectories([[fileName, slug]], result, details.weight, details.title, details.sectionId, rootId)
      } else if (file.endsWith('.md') && !fileName.endsWith('/_section.md')) {
        const fileContent = readFileSync(fileName, 'utf-8')
        // Passing a second argument to frontMatter disables cache. See https://github.com/asyncapi/website/issues/1057
        const { data, content } = frontMatter(fileContent, {})
        details = data
        details.toc = toc(content, { slugify: slugifyToC }).json
        details.readingTime = Math.ceil(readingTime(content).minutes)
        details.excerpt = details.excerpt || markdownToTxt(content).substr(0, 200)
        details.sectionSlug = sectionSlug || slug.replace(/\.md$/, '')
        details.sectionWeight = sectionWeight
        details.sectionTitle = sectionTitle
        details.sectionId = sectionId
        details.rootSectionId = rootSectionId
        details.id = fileName
        details.isIndex = fileName.endsWith('/index.md')
        details.slug = details.isIndex ? sectionSlug : slug.replace(/\.md$/, '')
        if(details.slug.includes('/reference/specification/') && !details.title) {
          const fileBaseName = basename(data.slug)  // ex. v2.0.0 | v2.1.0-next-spec.1
          const fileName = fileBaseName.split('-')[0] // v2.0.0 | v2.1.0

          details.weight = specWeight--

          if(fileName.startsWith('v')) {
            details.title = capitalize(fileName.slice(1))
          } else {
            details.title = capitalize(fileName)
          }

          if (fileBaseName.includes('next-spec') || fileBaseName.includes('next-major-spec')) {
            details.isPrerelease = true
            // this need to be separate because the `-` in "Pre-release" will get removed by `capitalize()` function
            details.title += " (Pre-release)"
          }
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

function isDirectory(dir) {
  return statSync(dir).isDirectory()
}

function capitalize(text) {
  return text.split(/[\s\-]/g).map(word => `${word[0].toUpperCase()}${word.substr(1)}`).join(' ')
}
