import { promises as fs } from 'fs';
import os from 'os';
import { resolve } from 'path';

// Lock file to prevent concurrent build-pages operations (shared across test files)
const BUILD_PAGES_LOCK_FILE = resolve(os.tmpdir(), 'build-pages-test.lock');

/**
 * Attempts to acquire an exclusive lock for building pages.
 * @returns Promise that resolves to true if lock was acquired, false otherwise.
 */
export async function acquireBuildPagesLock(): Promise<boolean> {
  try {
    // Try to create lock file exclusively
    await fs.writeFile(BUILD_PAGES_LOCK_FILE, process.pid.toString(), {
      flag: 'wx'
    });

    return true;
  } catch {
    // Lock file exists, another test is building pages
    return false;
  }
}

/**
 * Releases the lock file for building pages.
 */
export async function releaseBuildPagesLock(): Promise<void> {
  try {
    await fs.unlink(BUILD_PAGES_LOCK_FILE);
  } catch {
    // Lock file might have been removed by another process
  }
}

/**
 * Waits for pages build to complete by checking if pages directory has been built.
 * @param maxWaitMs Maximum time to wait in milliseconds (default: 60000)
 * @returns Promise that resolves to true if pages were built, false if timeout
 */
export async function waitForPagesBuild(maxWaitMs = 60000): Promise<boolean> {
  const startTime = Date.now();
  const checkInterval = 1000; // Check every 1 second

  while (Date.now() - startTime < maxWaitMs) {
    try {
      const pagesDir = resolve(process.cwd(), 'pages');

      // eslint-disable-next-line no-await-in-loop
      const stats = await fs.stat(pagesDir);

      if (stats.isDirectory()) {
        // eslint-disable-next-line no-await-in-loop
        const topLevelFiles = await fs.readdir(pagesDir);

        // Check if required directories exist
        if (topLevelFiles.includes('docs') || topLevelFiles.includes('blog') || topLevelFiles.includes('about')) {
          // Verify that files have been converted to .mdx by checking a subdirectory
          // eslint-disable-next-line max-depth
          for (const subdir of ['blog', 'docs', 'about']) {
            const subdirPath = resolve(pagesDir, subdir);

            // eslint-disable-next-line max-depth
            try {
              // eslint-disable-next-line no-await-in-loop
              const subdirStats = await fs.stat(subdirPath);

              // eslint-disable-next-line max-depth
              if (subdirStats.isDirectory()) {
                // eslint-disable-next-line no-await-in-loop
                const subdirFiles = await fs.readdir(subdirPath);

                // If we find .mdx files, pages is fully built
                // eslint-disable-next-line max-depth
                if (subdirFiles.some((file) => file.endsWith('.mdx'))) {
                  return true;
                }
              }
            } catch {
              // Subdirectory doesn't exist, continue checking
            }
          }
        }
      }
    } catch {
      // Pages directory doesn't exist yet
    }

    // Check if lock file still exists (another process is still building)
    try {
      // eslint-disable-next-line no-await-in-loop
      await fs.access(BUILD_PAGES_LOCK_FILE);
      // Lock exists, wait a bit more
      // eslint-disable-next-line no-await-in-loop
      await new Promise((res) => {
        setTimeout(res, checkInterval);
      });
    } catch {
      // Lock file doesn't exist, but pages might not be ready yet
      // eslint-disable-next-line no-await-in-loop
      await new Promise((res) => {
        setTimeout(res, checkInterval);
      });
    }
  }

  return false;
}
