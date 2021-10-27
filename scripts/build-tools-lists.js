/* eslint-disable */

const {
  readdirSync,
  readFileSync,
  writeFileSync,
} = require("fs");
const { join } = require("path");
const frontMatter = require("gray-matter");
const toc = require("markdown-toc");
const { slugify } = require("markdown-toc/lib/utils");

const tools = ["modelina"];

function slugifyToC(str) {
  let slug
  // Try to match heading ids like {# myHeadingId}
  const headingIdMatch = str.match(/[\s]?\{\#([\w\d\-_]+)\}/)
  if (headingIdMatch && headingIdMatch.length >= 2) {
    slug = headingIdMatch[1]
  } else {
    // Try to match heading ids like {<a name="myHeadingId"/>}
    const anchorTagMatch = str.match(/[\s]*<a[\s]+name="([\w\d\s\-_]+)"/)
    if (anchorTagMatch && anchorTagMatch.length >= 2) slug = anchorTagMatch[1]
  }
  return slug || slugify(str, { firsth1: true, maxdepth: 6 })
}

const WEIGHT_FOR_UNCATEGORIED_ITEMS = 99999;

const process = async () => {
  const toolsDirectoryLists = tools.map((tool) => ({
    tool,
    directory: join(__dirname, "../pages/tools", tool, "docs"),
  }));

  toolsDirectoryLists.forEach(({ tool, directory }) => {
    const files = readdirSync(directory);
    const allMarkdownFilesInDirectory = files.filter((file) =>
      file.endsWith(".md")
    );

    const allDocsByCategory = allMarkdownFilesInDirectory.reduce(
      (buildData, file, index) => {
        const pathToFile = join(directory, file);
        const { data, content } = frontMatter(
          readFileSync(pathToFile, "utf-8")
        );

        const category = data["sidebar-category"] || "other";
        const categoryWeight = data["sidebar-category-weight"] || WEIGHT_FOR_UNCATEGORIED_ITEMS; 
        const weight = data["weight"] || WEIGHT_FOR_UNCATEGORIED_ITEMS; 
        const title = data["sidebar-title"] || data["title"] || file.replace('.md', '');

        // make sure array
        buildData[category] = buildData[category] || [];
        buildData[category].push({
          slug: `/tools/${tool}/docs/${file.replace(".md", "")}`,
          toc: toc(content, { slugify: slugifyToC }).json,
          sectionWeight: categoryWeight,
          weight,
          title,
        });

        return buildData;
      },
      {}
    );

    const allDocsByCategorySortedByWeight = Object.keys(allDocsByCategory).reduce((sortedData, category) => {
      return {
        ...sortedData,
        [category]: allDocsByCategory[category].sort((a, b) => {
          return a.weight - b.weight;
        }),
      };
    }, {});

    const list = Object.keys(allDocsByCategorySortedByWeight).reduce((listData, category, index) => {

      // const categoryWeight = (category === 'other') ? WEIGHT_FOR_UNCATEGORIED_ITEMS : index + 1 * 100;

      const { sectionWeight } = allDocsByCategory[category][0] || {};
      return [
        ...listData,
        {
          title: category,
          weight: sectionWeight,
          isSection: true,
        },
        ...allDocsByCategory[category].map(item => ({...item, sectionWeight: sectionWeight})),
      ];
    }, []);


    writeFileSync(
      join(__dirname, `../config/tools/${tool}.json`),
      JSON.stringify(list, null, 4)
    );
  });
};

process();
