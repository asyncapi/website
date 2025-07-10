import { rssFeed } from '@/scripts/build-rss';
import { logger } from '@/scripts/helpers/logger';

/**
 * Runs the RSS feed build process for the AsyncAPI blog.
 *
 * This function invokes the rssFeed script to generate the RSS XML file for the blog.
 * It handles and logs any errors that occur during the process, attaching contextual
 * information to the error object for easier debugging.
 *
 * @returns {Promise<void>} Resolves when the RSS feed is built, or logs and handles errors if any occur.
 */
async function runBuildRss() {
  try {
    await rssFeed('blog', 'AsyncAPI Blog', 'Latest news and updates from AsyncAPI.', 'rss.xml');
  } catch (error) {
    if ((error as any).context) {
      (error as any).context = {
        ...(error as any).context,
        errorType: 'script_level_error'
      };
    } else {
      (error as any).context = {
        operation: 'runBuildRss',
        runner: 'build-rss-runner',
        originalError: error,
        errorType: 'runner_level_error',
        note: 'This error occurred at the runner level, not in the low-level script'
      };
    }
    logger.error('Build RSS runner failed', {
      error,
      script: 'build-rss-runner.ts',
      task: 'rss',
      timestamp: new Date().toISOString()
    });
  }
}

runBuildRss().catch(() => {
  process.exit(1);
});
