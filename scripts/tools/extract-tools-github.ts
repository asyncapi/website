/* eslint-disable no-await-in-loop */
import axios from 'axios';
import dotenv from 'dotenv';

import type { ToolsData } from '@/types/scripts/tools';

import { pause } from '../helper/utils';
import { logger } from '../helper/logger';

dotenv.config();

/**
 * Fetches tool data from the GitHub API.
 *
 * @returns {Promise<ToolsData>} The data from the GitHub API.
 * @throws {Error} If there is an error fetching the data.
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

    return result.data;
  } catch (err) {
    throw err;
  }
}
