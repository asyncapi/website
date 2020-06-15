const purgecss = [
  "@fullhuman/postcss-purgecss",
  {
    content: ["./components/**/*.*", "./pages/**/*.*"],
    whitelistPatterns: [
      /left-/,
      /mr-/,
      /pl-/,
      /z-/,
      /(md|lg):mb-/,
      /(md|lg):text-xs$/,
      /(md|lg):text-gray-/,
      /(md|lg):font-/,
      /(md|lg):block$/,
      /(md|lg):hidden$/,
      /(md|lg):cursor-/,
      /(md|lg):flex/,
      /asyncapi\-[\w]+/,
      /generator\-[\w]+/,
      /w\-2\.5/,
      /h\-2\.5/,
    ],
    defaultExtractor: content => content.match(/[\w-/:()]+(?<!:)/g) || []
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
