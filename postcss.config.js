const purgecss = [
  "@fullhuman/postcss-purgecss",
  {
    content: ["./components/**/*.js", "./pages/**/*.js"],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
  }
];
module.exports = {
  plugins: [
    "postcss-import",
    "@zeit/next-css",
    "tailwindcss",
    "autoprefixer",
    ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
  ]
};
