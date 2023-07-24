const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  "env": {
    YOUTUBE_TOKEN: "FAKE_YOUTUBE_API_KEY"
  }
});

