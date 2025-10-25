import fs from 'fs/promises';
import he from 'he'; // Updated import
import json2xml from 'jgexml/json2xml';

import type { Details, Result } from '@/types/scripts/build-posts-list';
import type { BlogPostTypes, RSS, RSSItemType } from '@/types/scripts/build-rss';

/**
 * Asynchronously retrieves all blog posts from the posts configuration file.
 *
 * @returns A promise that resolves to the list of blog posts.
 */
async function getAllPosts() {
  const posts = (await import('../config/posts.json')).default as Result;

  return posts;
}

/**
 * Generates and writes an RSS feed file for a specified blog post type.
 *
 * Retrieves all blog posts, filters out those without a publication date, and validates that each post
 * contains the required fields (title, slug, excerpt, date). The posts are then sorted by featured status
 * and publication date before being converted into an RSS feed structure. The resulting XML feed is written
 * to the specified output file path.
 *
 * @param type - The blog post type to include in the feed.
 * @param rssTitle - The title of the RSS feed.
 * @param desc - A description of the RSS feed.
 * @param outputPath - The file path where the generated RSS feed should be saved.
 *
 * @throws {Error} If any blog post is missing required fields or if an error occurs during the RSS feed generation
 * or file writing process.
 */
export async function rssFeed(type: BlogPostTypes, rssTitle: string, desc: string, outputPath: string) {
  try {
    let posts = (await getAllPosts())[`${type}`] as Details[];
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
    const mimeTypes: {
      [key: string]: string;
    } = {
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

    for (const post of posts) {
      const link = `${base}${post.slug}${tracking}`;
      const { title, excerpt, date } = post;
      const pubDate = new Date(date).toUTCString();
      const description = he.decode(excerpt!);
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
        const fileExtension = post.cover.substring(post.cover.lastIndexOf('.')).toLowerCase();
        const mimeType = mimeTypes[fileExtension] || 'image/jpeg';

        item.enclosure = {
          '@url': base + post.cover,
          '@length': 15026, // dummy value, anything works
          '@type': mimeType
        };
      }
      rss.channel.item.push(item);
    }

    feed.rss = rss;

    const xml = json2xml.getXml(feed, '@', '', 2);

    await fs.writeFile(`./public/${outputPath}`, xml, 'utf8');
  } catch (err) {
    throw new Error(`Failed to generate RSS feed: ${(err as Error).message}`);
  }
}
