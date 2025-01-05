/* eslint-disable no-await-in-loop */
import axios from 'axios';
import dotenv from 'dotenv';

import { pause } from '../utils';

dotenv.config();

/**
 * Fetches tool data from the GitHub API.
 *
 * @returns {Promise<any>} The data from the GitHub API.
 * @throws {Error} If there is an error fetching the data.
 */
export async function getData(): Promise<any> {
  // eslint-disable-next-line no-useless-catch
  try {
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
      console.log('Fetching page:', page);
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
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Please try again later.');
      }
      if (err.response?.status === 401) {
        throw new Error('Invalid GitHub token. Please check your GITHUB_TOKEN.');
      }
      throw new Error(`GitHub API error: ${err.response?.data?.message || err.message}`);
    }
    throw err;
  }
}
