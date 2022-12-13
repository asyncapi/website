const { languagesColor, technologiesColor } = require("./tags-color")
const { categoryList } = require("./categorylist.js")
const fs = require('fs')
const { resolve } = require('path');
const Fuse = require("fuse.js")
const automatedTools = require('../../config/tools-automated.json')
const manualTools = require('../../config/tools-manual.json')

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
    threshold: 0.5,
    keys: ['name', 'color', 'borderColor']
}

let list = [...languagesColor, ...technologiesColor]
let fuse = new Fuse(list, options)

const getFinalTool = async (toolObject) => {
    let finalObject = toolObject;

    //there might be a tool without language
    if (toolObject.filters.language) {
        const languageSearch = await fuse.search(toolObject.filters.language)
        if (languageSearch.length) {
            finalObject.filters.language = languageSearch[0].item;
        }
    }
    let technologyArray = [];
    for (const technology of toolObject.filters.technology) {
        const technologySearch = await fuse.search(technology) 
        if (technologySearch.length > 0) {
            technologyArray.push(technologySearch[0].item);
        } 
        else {
            let technologyObject = {
                name: technology,
                color: 'bg-[#2074fa]',
                borderColor: 'border-[#0364ff]'
            }
            list.push(technologyObject);
            technologyArray.push(technologyObject);
            fuse = new Fuse(list, options)
        }
    }
    finalObject.filters.technology = technologyArray;
    return finalObject;
}

const combineTools = async (automatedTools, manualTools) => {
    for (const key in automatedTools) {
        let finalToolsList = [];
        if (automatedTools[key].toolsList.length) {
            for (const tool of automatedTools[key].toolsList) {
                finalToolsList.push(await getFinalTool(tool))
            }
        }
        if (manualTools[key] && manualTools[key].toolsList.length) {
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

module.exports = { combineTools }