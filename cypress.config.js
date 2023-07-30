const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});

