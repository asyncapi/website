const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const getData = async () => {
  try {
    const result = await axios.get(
      'https://api.github.com/search/code?q=filename:.asyncapi-tool',
      {
        headers: {
          accept: 'application/vnd.github.text-match+json',
          authorization: `token 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`,
        },
      }
    );
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getData };