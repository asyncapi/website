import { rssFeed } from '../scripts/build-rss';

export async function runBuildRss() {
  try {
    await rssFeed('blog', 'AsyncAPI Blog', 'Latest news and updates from AsyncAPI.', 'rss.xml');
  } catch (err) {
    throw err;
  }
}
