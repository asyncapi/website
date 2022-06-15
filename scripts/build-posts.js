const { readdirSync, readFileSync, writeFileSync } = require('fs')
const { join, resolve } = require('path')
const frontMatter = require('gray-matter')
const toc = require('markdown-toc')
const readingTime = require('reading-time')
const { markdownToTxt } = require('markdown-to-txt')

const { slugifyToC } = require('./common');

const directories = [
  {
    dir: 'pages/blog',
    slug: '/blog',
    output: 'blog-posts',
  },
  {
    dir: 'pages/jobs',
    slug: '/jobs',
    output: 'jobs',
  }
]

module.exports = async function buildDocs() {
  for (const meta of directories) {
    const result = walk(meta.dir, meta);
    writeFileSync(resolve(__dirname, '..', 'config', `${meta.output}.json`), JSON.stringify(result, null, '  '))
  }
}

function walk(directory, meta) {
  const result = [];
  const files = readdirSync(directory);

  for (const file of files) {
    const fileName = join(directory, file);

    if (!file.endsWith('.md')) {
      continue;
    }

    const fileContent = readFileSync(fileName, 'utf-8')
    const { data, content } = frontMatter(fileContent);
    const details = { meta: data };
    details.content = content;
    details.toc = toc(content, { slugify: slugifyToC }).json;
    details.meta.readingTime = Math.ceil(readingTime(content).minutes);
    details.meta.excerpt = details.meta.excerpt || markdownToTxt(content).substr(0, 200);
    details.slug = fileName.replace(/\.md$/, '');
    details.slug = details.slug.replace(meta.dir, meta.slug);
    details.filePath = fileName;

    result.push(details);
  }

  sortFiles(result);
  return result;
}

function sortFiles(files) {
  files.sort((i1, i2) => {
    if (i1.meta.featured && !i2.meta.featured) return -1;
    if (!i1.meta.featured && i2.meta.featured) return 1;

    const i1Date = new Date(i1.meta.date);
    const i2Date = new Date(i2.meta.date);
    return i2Date - i1Date;
  })
}
