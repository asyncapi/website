const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    video : false,
    screenshotOnRunFailure : false
  },
  retries: {
    runMode: 3
  }
});
