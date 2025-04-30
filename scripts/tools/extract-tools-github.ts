/* eslint-disable no-await-in-loop */
import axios from 'axios';
import dotenv from 'dotenv';

import type { ToolsData } from '@/types/scripts/tools';

import { logger } from '../helpers/logger';
import { pause } from '../helpers/utils';

dotenv.config();

/**
 * Fetches all GitHub code search results for files named ".asyncapi-tool" and returns a deduplicated array of items.
 *
 * Aggregates paginated results from the GitHub Code Search API, pausing between requests to respect rate limits.
 *
 * @returns A promise that resolves to an array of unique tool data items from GitHub.
 *
 * @throws {Error} If the GITHUB_TOKEN environment variable is missing or if an error occurs during data retrieval.
 */
export async function getData(): Promise<ToolsData> {
  // eslint-disable-next-line no-useless-catch
  try {
    if (!process.env.GITHUB_TOKEN) {
      throw new Error('GITHUB_TOKEN environment variable is required');
    }
    const allItems = new Set();
    let page = 1;
    let incompleteResult = false;

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

    incompleteResult = result.data.incomplete_results || false;

    result.data.items.forEach((item: any) => {
      allItems.add(item);
    });

    while (incompleteResult) {
      page++;

      logger.info(`Fetching page: ${page}`);
      // pause for 1 second to avoid rate limiting
      await pause(1000);
      const nextPageData = await axios.get(getReqUrl(maxPerPage, page), {
        headers
      });

      const { data } = nextPageData;

      data.items.forEach((item: any) => {
        allItems.add(item);
      });

      incompleteResult = data.incomplete_results || false;
    }

    result.data.items = [...allItems];

    return result.data.items;
  } catch (err) {
    throw err;
  }
}
