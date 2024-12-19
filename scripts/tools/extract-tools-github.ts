import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const getData = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
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
};

export { getData };
