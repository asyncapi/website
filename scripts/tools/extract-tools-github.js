const axios = require('axios');

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
    throw err;
  }
};

module.exports = { getData };