const axios = require('axios');
require('dotenv').config()

const getData = async () => {
  try {
    const result = await axios.get(
      'https://api.github.com/search/code?q=filename:.asyncapi-tool',
      {
        headers: {
          accept: 'application/vnd.github.text-match+json',
          authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    return result.data;
  } catch (err) {
    throw err;
  }
};

module.exports = { getData };