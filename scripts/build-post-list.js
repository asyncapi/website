const { readdirSync, statSync, existsSync, readFileSync, writeFileSync } = require('fs')
const { join, resolve, basename } = require('path')
const { inspect } = require('util')
const frontMatter = require('gray-matter')
const toc = require('markdown-toc')

const result = []
const basePath = 'pages'
const postDirectories = [
  `${basePath}/docs`,
]
walkDirectories(postDirectories, result)
if (process.env.NODE_ENV === 'production') {
  console.log(inspect(result, { depth: null, colors: true }))
}
writeFileSync(resolve(__dirname, '..', 'config', 'posts.json'), JSON.stringify(result, null, '  '))

function walkDirectories(directories, result, sectionSlug = '', sectionWeight = 0) {
  for (let dir of directories) {
    let files = readdirSync(dir)

    for (let file of files) {
      let details
      const fileName = join(dir, file)
      const fileNameWithSection = join(fileName, '_section.md')
      const slug = fileName.replace(new RegExp(`^${basePath}`), '')
      if (isDirectory(fileName)) {
        if (existsSync(fileNameWithSection)) {
          details = frontMatter(readFileSync(fileNameWithSection, 'utf-8')).data
          details.title = details.title || capitalize(basename(fileName))
        } else {
          details = {
            title: capitalize(basename(fileName)),
          }
        }
        details.isSection = true
        details.slug = slug
        result.push(details)
        walkDirectories([fileName], result, slug, details.weight)
      } else if (!fileName.endsWith('/_section.md')) {
        const fileContent = readFileSync(fileName, 'utf-8')
        details = frontMatter(fileContent).data
        details.toc = toc(fileContent).json
        details.sectionSlug = sectionSlug
        details.sectionWeight = sectionWeight
        details.isIndex = fileName.endsWith('/index.md')
        details.slug = details.isIndex ? sectionSlug : slug.replace(/\.md$/, '')
        result.push(details)
      }
    }
  }
}

function isDirectory(dir) {
  return statSync(dir).isDirectory()
}

function capitalize(text) {
  return text.split(/[\s\-]/g).map(word => `${word[0].toUpperCase()}${word.substr(1)}`).join(' ')
}