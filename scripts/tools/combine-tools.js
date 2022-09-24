const automatedTools = require("../../config/tools-automated.json")
const manualTools = require("../../config/tools-manual.json")
const { languages, technologies } = require("./tags-color")
const fs =  require('fs')
const { resolve } = require('path');
const Fuse = require("fuse.js")

let finalTools = {
    "generator": [],
    "code-first": [],
    "converters": [],
    "validators": [],
    "directories": [],
    "documentation generators": [],
    "dls": [],
    "frameworks": [],
    "ui components": [],
    "mocking and testing": [],
    "diff": [],
    "ci&cd": [],
    "editors": [],
    "others": []
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
    for (const item in toolObject.filters.technology) {
        let technology = toolObject.filters.technology[item];
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
        let toolsList = [];
        if (automatedTools[key].length) {
            for (const item in automatedTools[key]) {
                toolsList.push(await getFinalTool(automatedTools[key][item]))
            }
        }
        if(manualTools[key].length){
            for (const item in manualTools[key]) {
                toolsList.push(await getFinalTool(manualTools[key][item]))
            }
        }
        finalTools[key] = toolsList
    }
    fs.writeFileSync(
        resolve(__dirname, '../../config', 'tools.json'),
        JSON.stringify(finalTools)
      );
}
main()