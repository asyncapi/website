const automatedTools = require("../../config/tools-automated.json")
const manualTools = require("../../config/tools-manual.json")
const { languages, technologies } = require("./tags-color")
const { categoryList } = require("./categorylist.js")
const fs = require('fs')
const { resolve } = require('path');
const Fuse = require("fuse.js")

let finalTools = {};
for (var category of categoryList) {
    finalTools[category.name] = {
        description: category.description,
        toolsList: []
    };
}

const options = {
    includeScore: true,
    shouldSort: true,
    threshold: 0.2,
    keys: ['name']
}

let list = [...languages, ...technologies]
const fuse = new Fuse(list, options)

const getFinalTool = async (toolObject) => {
    let finalObject = toolObject;
    const languageSearch = await fuse.search(toolObject.filters.language)
    if (languageSearch.length) {
        finalObject.filters.language = languageSearch[0].item;
    }
    let technologyArray = [];
    for (const technology of toolObject.filters.technology) {
        const technologySearch = await fuse.search(technology)
        if (technologySearch.length) {
            technologyArray.push(technologySearch[0].item);
        }
    }
    finalObject.filters.technology = technologyArray;
    return finalObject;

}

const main = async () => {
    for (const key in automatedTools) {
        let finalToolsList = [];
        if (automatedTools[key].toolsList.length) {
            for (const tool of automatedTools[key].toolsList) {
                finalToolsList.push(await getFinalTool(tool))
            }
        }
        if (manualTools[key].toolsList.length) {
            for (const tool of manualTools[key].toolsList) {
                finalToolsList.push(await getFinalTool(tool))
            }
        }
        finalTools[key].toolsList = finalToolsList
    }
    fs.writeFileSync(
        resolve(__dirname, '../../config', 'tools.json'),
        JSON.stringify(finalTools)
    );
}
main()