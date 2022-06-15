const { statSync } = require('fs')
const { slugify } = require('markdown-toc/lib/utils')

function slugifyToC(str) {
  let slug;
  // Try to match heading ids like {# myHeadingId}
  const headingIdMatch = str.match(/[\s]?\{\#([\w\d\-_]+)\}/);
  if (headingIdMatch && headingIdMatch.length >= 2) {
    slug = headingIdMatch[1];
  } else {
    // Try to match heading ids like {<a name="myHeadingId"/>}
    const anchorTagMatch = str.match(/[\s]*<a[\s]+name="([\w\d\s\-_]+)"/)
    if (anchorTagMatch && anchorTagMatch.length >= 2) {
      slug = anchorTagMatch[1];
    }
  }
  return slug || slugify(str, { firsth1: true, maxdepth: 6 });
}

function isDirectory(dir) {
  return statSync(dir).isDirectory();
}

function capitalize(text) {
  return text.split(/[\s\-]/g).map(word => `${word[0].toUpperCase()}${word.substr(1)}`).join(' ');
}

function getReleaseDate(text) {
  // ex. filename = v2.1.0-2021-06-release
  const splittedText = text.split('-'); // ['v2.1.0', '2021', '06', 'release']
  const releaseDate = `${splittedText[1]}-${splittedText[2]}`; // '2021-06'
  return releaseDate;
}

module.exports = {
  slugifyToC,
  isDirectory,
  capitalize,
  getReleaseDate,
}
