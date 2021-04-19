const fs = require('fs')
const json2xml = require('jgexml/json2xml')

function getAllPosts() {
  return require('../config/posts.json')
}

function clean(s) {
  return s.split('&amp').join('&')
}

function rssFeed() {
  const posts = getAllPosts()
    .filter(p => p.slug.startsWith('/blog/'))
    .sort((i1, i2) => {
      const i1Date = new Date(i1.date)
      const i2Date = new Date(i2.date)

      if (i1.featured && !i2.featured) return -1
      if (!i1.featured && i2.featured) return 1
      return i2Date - i1Date
    })

  const base = 'https://asyncapi.com'

  const feed = {}
  const rss = {}
  rss['@version'] = '2.0'
  rss["@xmlns:atom"] = 'http://www.w3.org/2005/Atom'
  rss.channel = {}
  rss.channel.title = 'AsyncAPI Blog RSS Feed'
  rss.channel.link = base+'/rss'
  rss.channel["atom:link"] = {}
  rss.channel["atom:link"]["@rel"] = 'self'
  rss.channel["atom:link"]["@href"] = rss.channel.link
  rss.channel["atom:link"]["@type"] = 'application/rss+xml'
  rss.channel.description = 'AsyncAPI Blog'
  rss.channel.webMaster = 'info@asyncapi.io'
  rss.channel.pubDate = new Date().toUTCString()
  rss.channel.generator = 'next.js'
  rss.channel.item = []

  for (let post of posts) {
    rss.channel.item.push({ title: post.title, description: clean(post.excerpt), link: base+post.slug, category: 'blog', guid: { '@isPermaLink': true, '': base+post.slug }, pubDate: new Date(post.date).toUTCString() })
  }

  feed.rss = rss

  const xml = json2xml.getXml(feed,'@','',2)
  fs.writeFileSync('./public/rss.xml',xml,'utf8')
}

rssFeed()

