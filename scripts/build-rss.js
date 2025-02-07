const fs = require('fs').promises
const json2xml = require('jgexml/json2xml')

function getAllPosts() {
  return require('../config/posts.json');
}

function clean(s) {
  s = s.split('&ltspan&gt').join('')
  s = s.split('&amp').join('&')
  s = s.split('&#39;').join("'")
  s = s.split('&lt;').join('<')
  s = s.split('&gt;').join('>')
  s = s.split('&quot;').join('"')
  return s
}

module.exports = async function rssFeed(type, title, desc, outputPath) {
  try {

    let posts = getAllPosts()[`${type}`]
    const missingDatePosts = posts.filter(post => !post.date);
    posts = posts.filter(post => post.date);
    posts.sort((i1, i2) => {
      const i1Date = new Date(i1.date);
      const i2Date = new Date(i2.date);
      if (i1.featured && !i2.featured) return -1;
      if (!i1.featured && i2.featured) return 1;
      return i2Date - i1Date;
    });

    if (missingDatePosts.length > 0) {
      throw new Error(`Missing date in posts: ${missingDatePosts.map(p => p.title || p.slug).join(', ')}`);
    }

    const base = 'https://www.asyncapi.com'
    const tracking = '?utm_source=rss';

    const feed = {}
    const rss = {}
    rss['@version'] = '2.0'
    rss["@xmlns:atom"] = 'http://www.w3.org/2005/Atom'
    rss.channel = {}
    rss.channel.title = title
    rss.channel.link = `${base}/${outputPath}`
    rss.channel["atom:link"] = {}
    rss.channel["atom:link"]["@rel"] = 'self'
    rss.channel["atom:link"]["@href"] = rss.channel.link
    rss.channel["atom:link"]["@type"] = 'application/rss+xml'
    rss.channel.description = desc
    rss.channel.language = 'en-gb';
    rss.channel.copyright = 'Made with :love: by the AsyncAPI Initiative.';
    rss.channel.webMaster = 'info@asyncapi.io (AsyncAPI Initiative)'
    rss.channel.pubDate = new Date().toUTCString()
    rss.channel.generator = 'next.js'
    rss.channel.item = []

    const invalidPosts = posts.filter(post =>
      !post.title || !post.slug || !post.excerpt || !post.date
    );

    if (invalidPosts.length > 0) {
      throw new Error(`Missing required fields in posts: ${invalidPosts.map(p => p.title || p.slug).join(', ')}`);
    }

    const mimeTypes = {
      '.jpeg': 'image/jpeg',
      '.jpg': 'image/jpeg',
      '.png': 'image/png',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp',
      '.gif': 'image/gif',
      '.bmp': 'image/bmp',
      '.tiff': 'image/tiff',
      '.ico': 'image/x-icon'
    };

    for (let post of posts) {
      const link = `${base}${post.slug}${tracking}`;
      const { title, excerpt, date } = post;
      const pubDate = new Date(date).toUTCString();
      const description = clean(excerpt);
      const guid = { '@isPermaLink': true, '': link };
      const item = {
        title,
        description,
        link,
        category: type,
        guid,
        pubDate
      };
      if (post.cover) {
        const fileExtension = post.cover.substring(post.cover.lastIndexOf('.')).toLowerCase();
        const mimeType = mimeTypes[fileExtension] || 'image/jpeg';
        item.enclosure = {
          "@url": base + post.cover,
          "@length": 15026, // dummy value, anything works
          "@type": mimeType
        };
      }
      rss.channel.item.push(item)
    }

    feed.rss = rss

    const xml = json2xml.getXml(feed, '@', '', 2);
    await fs.writeFile(`./public/${outputPath}`, xml, 'utf8');
  } catch (err) {
    throw new Error(`Failed to generate RSS feed: ${err.message}`);
  }
};
