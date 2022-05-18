const purgecss = [
  "@fullhuman/postcss-purgecss",
  {
    content: ["./components/**/*.*", "./pages/**/*.*"],
    whitelistPatterns: [
      /left-/,
      /mr-/,
      /pl-/,
      /px-/,
      /py-/,
      /z-/,
      /(md|lg|xl):mb-/,
      /(md|lg|xl):text-xs$/,
      /(md|lg|xl):text-gray-/,
      /(md|lg|xl):font-/,
      /(md|lg|xl):block$/,
      /(md|lg|xl):hidden$/,
      /(md|lg|xl):cursor-/,
      /(md|lg|xl):flex/,
      /^xl:max-w-184$/,
      /asyncapi\-[\w]+/,
      /generator\-[\w]+/,
      /w\-2\.5/,
      /h\-2\.5/,
      /:target/
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
