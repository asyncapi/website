const { readdirSync, existsSync, readFileSync, writeFileSync } = require('fs')
const { join, resolve } = require('path')
const frontMatter = require('gray-matter')
const toc = require('markdown-toc')

const { slugifyToC, isDirectory, capitalize, getReleaseDate } = require('./common');

const directories = [
  {
    dir: 'pages/docs',
    slug: '/docs',
    output: 'docs',
  }
]

module.exports = async function buildDocs() {
  for (const meta of directories) {
    const result = walk(meta.dir, meta);
    writeFileSync(resolve(__dirname, '..', 'config', `${meta.output}.json`), JSON.stringify(result, null, '  '))
  }
}

let specificationOrder = 0;
function walk(directory, meta) {
  const result = { files: [], section: {} };
  const files = readdirSync(directory);

  for (const file of files) {
    const fileName = join(directory, file);

    if (isDirectory(fileName)) {
      result.files.push(walk(fileName, meta))
      continue;
    }

    if (file === '_section.md') {
      result.section = frontMatter(readFileSync(fileName, 'utf-8')).data;
      result.section.slug = fileName.replace(/\/_section\.md$/, '');
      result.section.slug = result.section.slug.replace(meta.dir, meta.slug);
      continue;
    }

    if (!file.endsWith('.md')) {
      continue;
    }

    const fileContent = readFileSync(fileName, 'utf-8')
    const { data, content } = frontMatter(fileContent);
    const details = { meta: data };
    details.content = content;
    details.toc = toc(content, { slugify: slugifyToC }).json;
    if (fileName.endsWith('/index.md')) {
      details.slug = fileName.replace(/\/index\.md$/, '');
    } else {
      details.slug = fileName.replace(/\.md$/, '');
    }
    details.slug = details.slug.replace(meta.dir, meta.slug);
    details.filePath = fileName;

    if (existsSync(join(directory, '_section.md'))) {
      details.sectionTitle = frontMatter(readFileSync(join(directory, '_section.md'), 'utf-8')).data.title;
    }

    // handle specifications
    if (details.slug.includes('docs/reference/specification/') && Object.keys(details.meta).length === 0) {
      const fileBaseName = file; // ex. v2.0.0 | v2.1.0-2021-06-release
      const fileName = fileBaseName.split('-')[0]; // v2.0.0 | v2.1.0

      if (fileBaseName.includes('release')) {
        details.meta.isPrerelease = true;
        details.meta.releaseDate = getReleaseDate(fileBaseName);
      }

      details.meta.weight = specificationOrder--;
      if (fileName.startsWith('v')) {
        details.meta.title = capitalize(fileName.replace(/\.md$/, '').slice(1));
      } else {
        details.meta.title = capitalize(fileName.replace(/\.md$/, ''));
      }

      if (details.meta.isPrerelease) {
        // this need to be separate because the `-` in "Pre-release" will get removed by `capitalize()` function
        details.meta.title += " (Pre-release)";
      }
    }

    result.files.push(details);
  }

  sortFiles(result.files);
  return result;
}

function sortFiles(files) {
  files.sort((i1, i2) => {
    const weight1 = i1.files ? i1.section.weight : i1.meta.weight;
    const weight2 = i2.files ? i2.section.weight : i2.meta.weight;
    return weight1 - weight2;
  });
}
