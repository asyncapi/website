import assert from 'assert';
import fs from 'fs/promises';
import json2xml from 'jgexml/json2xml';

import type { BlogPostTypes, Enclosure, RSS, RSSItemType } from '@/types/scripts/build-rss';

async function getAllPosts() {
  const posts = (await import('../config/posts.json', { assert: { type: 'json' } })).default;

  return posts;
}

function clean(s: string) {
  let cleanS = s;

  cleanS = cleanS.split('&ltspan&gt').join('');
  cleanS = cleanS.split('&amp').join('&');
  cleanS = cleanS.split('&#39;').join("'");
  cleanS = cleanS.split('&lt;').join('<');
  cleanS = cleanS.split('&gt;').join('>');
  cleanS = cleanS.split('&quot;').join('"');

  return cleanS;
}

export async function rssFeed(type: BlogPostTypes, rssTitle: string, desc: string, outputPath: string) {
  try {
    let posts = (await getAllPosts())[`${type}`] as any[];
    const missingDatePosts = posts.filter((post) => !post.date);

    posts = posts.filter((post) => post.date);
    posts.sort((i1, i2) => {
      const i1Date = new Date(i1.date);
      const i2Date = new Date(i2.date);

      if (i1.featured && !i2.featured) return -1;
      if (!i1.featured && i2.featured) return 1;

      return i2Date.getTime() - i1Date.getTime();
    });

    if (missingDatePosts.length > 0) {
      throw new Error(`Missing date in posts: ${missingDatePosts.map((p) => p.title || p.slug).join(', ')}`);
    }

    const base = 'https://www.asyncapi.com';
    const tracking = '?utm_source=rss';

    const feed = {} as { rss: RSS };
    const rss = {} as RSS;

    rss['@version'] = '2.0';
    rss['@xmlns:atom'] = 'http://www.w3.org/2005/Atom';
    rss.channel = {} as RSS['channel'];
    rss.channel.title = rssTitle;
    rss.channel.link = `${base}/${outputPath}`;
    rss.channel['atom:link'] = {} as RSS['channel']['atom:link'];
    rss.channel['atom:link']['@rel'] = 'self';
    rss.channel['atom:link']['@href'] = rss.channel.link;
    rss.channel['atom:link']['@type'] = 'application/rss+xml';
    rss.channel.description = desc;
    rss.channel.language = 'en-gb';
    rss.channel.copyright = 'Made with :love: by the AsyncAPI Initiative.';
    rss.channel.webMaster = 'info@asyncapi.io (AsyncAPI Initiative)';
    rss.channel.pubDate = new Date().toUTCString();
    rss.channel.generator = 'next.js';
    rss.channel.item = [];

    const invalidPosts = posts.filter((post) => !post.title || !post.slug || !post.excerpt || !post.date);

    if (invalidPosts.length > 0) {
      throw new Error(`Missing required fields in posts: ${invalidPosts.map((p) => p.title || p.slug).join(', ')}`);
    }

    for (const post of posts) {
      const link = `${base}${post.slug}${tracking}`;
      const { title, excerpt, date } = post;
      const pubDate = new Date(date).toUTCString();
      const description = clean(excerpt);
      const guid = { '@isPermaLink': true, '': link };
      const item: RSSItemType = {
        title,
        description,
        link,
        category: type,
        guid,
        pubDate
      } as RSSItemType;

      if (post.cover) {
        const enclosure = {} as Enclosure;

        enclosure['@url'] = base + post.cover;
        enclosure['@length'] = 15026; // dummy value, anything works
        enclosure['@type'] = 'image/jpeg';
        if (typeof enclosure['@url'] === 'string') {
          const tmp = enclosure['@url'].toLowerCase();

          // eslint-disable-next-line max-depth
          if (tmp.indexOf('.png') >= 0) enclosure['@type'] = 'image/png';
          // eslint-disable-next-line max-depth
          if (tmp.indexOf('.svg') >= 0) enclosure['@type'] = 'image/svg+xml';
          // eslint-disable-next-line max-depth
          if (tmp.indexOf('.webp') >= 0) enclosure['@type'] = 'image/webp';
        }
        item.enclosure = enclosure;
      }
      rss.channel.item.push(item);
    }

    feed.rss = rss;

    const xml = json2xml.getXml(feed, '@', '', 2);

    await fs.writeFile(`./public/${outputPath}`, xml, 'utf8');
  } catch (err) {
    assert(err instanceof Error);
    throw new Error(`Failed to generate RSS feed: ${err.message}`);
  }
}
