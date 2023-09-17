const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    video: false,
    screenshotOnRunFailure: false,
  },

  e2e: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    video: false,
    screenshotOnRunFailure: false,
  },
});
