import axios from 'axios';
import dotenv from 'dotenv';

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
    if (!process.env.GITHUB_TOKEN) {
      throw new Error('GITHUB_TOKEN environment variable is required');
    }
    const result = await axios.get('https://api.github.com/search/code?q=filename:.asyncapi-tool', {
      headers: {
        accept: 'application/vnd.github.text-match+json',
        authorization: `token ${process.env.GITHUB_TOKEN}`
      }
    });

    return result.data;
  } catch (err) {
    throw err;
  }
}
