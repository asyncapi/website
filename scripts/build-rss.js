const fs = require('fs')
const json2xml = require('jgexml/json2xml')

function getAllPosts() {
  return require('../config/posts.json')
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

module.exports = function rssFeed(type, title, desc, outputPath) {

  const posts = getAllPosts()[`${type}`]
    .sort((i1, i2) => {
      const i1Date = new Date(i1.date)
      const i2Date = new Date(i2.date)

      if (i1.featured && !i2.featured) return -1
      if (!i1.featured && i2.featured) return 1
      return i2Date - i1Date
    })

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

  for (let post of posts) {
    const link = `${base}${post.slug}${tracking}`;
    const item = { title: post.title, description: clean(post.excerpt), link, category: type, guid: { '@isPermaLink': true, '': link }, pubDate: new Date(post.date).toUTCString() }
    if (post.cover) {
      const enclosure = {};
      enclosure["@url"] = base+post.cover;
      enclosure["@length"] = 15026; // dummy value, anything works
      enclosure["@type"] = 'image/jpeg';
      if (typeof enclosure["@url"] === 'string') {
        let tmp = enclosure["@url"].toLowerCase();
        if (tmp.indexOf('.png')>=0) enclosure["@type"] = 'image/png';
        if (tmp.indexOf('.svg')>=0) enclosure["@type"] = 'image/svg+xml';
        if (tmp.indexOf('.webp')>=0) enclosure["@type"] = 'image/webp';
      }
      item.enclosure = enclosure;
    }
    rss.channel.item.push(item)
  }

  feed.rss = rss

  const xml = json2xml.getXml(feed,'@','',2)
  fs.writeFileSync(`./public/${outputPath}`, xml, 'utf8')
};
