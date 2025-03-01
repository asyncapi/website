/* eslint-disable no-await-in-loop */
import axios from 'axios';
import dotenv from 'dotenv';

import type { ToolsData } from '@/types/scripts/tools';

import { pause } from '../utils';
import { logger } from '../utils/logger';

dotenv.config();

/**
 * Retrieves tool data by searching for files named ".asyncapi-tool" using the GitHub Code Search API.
 *
 * This function requires the GITHUB_TOKEN environment variable for authorization. It retrieves data in pages (up to 50 items per page)
 * and pauses 1 second between requests to respect GitHub's rate limits. All pages are aggregated into a single result before being returned.
 *
 * @returns A promise that resolves to the aggregated ToolsData from GitHub.
 * @throws {Error} When the GITHUB_TOKEN environment variable is missing or an error occurs during the fetching process.
 */
export async function getData(): Promise<ToolsData> {
  // eslint-disable-next-line no-useless-catch
  try {
    if (!process.env.GITHUB_TOKEN) {
      throw new Error('GITHUB_TOKEN environment variable is required');
    }
    const allItems = [];
    let page = 1;

    const maxPerPage = 50;
    const getReqUrl = (PerPage: number, pageNo: number) =>
      `https://api.github.com/search/code?q=filename:.asyncapi-tool&per_page=${PerPage}&page=${pageNo}`;
    const headers = {
      accept: 'application/vnd.github.text-match+json',
      authorization: `token ${process.env.GITHUB_TOKEN}`
    };
    const result = await axios.get(getReqUrl(maxPerPage, page), {
      headers
    });
    const totalResults = result.data.total_count;

    allItems.push(...result.data.items);

    while (allItems.length < totalResults) {
      page++;

      logger.info(`Fetching page: ${page}`);
      // pause for 1 second to avoid rate limiting
      await pause(1000);
      const nextPageData = await axios.get(getReqUrl(maxPerPage, page), {
        headers
      });

      const { data } = nextPageData;

      allItems.push(...data.items);
    }

    result.data.items.push(...allItems);

    return result.data;
  } catch (err) {
    throw err;
  }
}
