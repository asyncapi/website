const { languagesColor, technologiesColor } = require("./tags-color")
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
    threshold: 0.5,
    keys: ['name', 'color', 'borderColor']
}

let languageList = [...languagesColor], technologyList = [...technologiesColor];
let languageFuse = new Fuse(languageList, options), technologyFuse = new Fuse(technologyList, options)

const getFinalTool = async (toolObject) => {
    let finalObject = toolObject;

    //there might be a tool without language
    if (toolObject.filters.language) {
        const languageSearch = await languageFuse.search(toolObject.filters.language)
        if (languageSearch.length) {
            finalObject.filters.language = languageSearch[0].item;
        }else{
            let languageObject = {
                name: language,
                color: 'bg-[#57f281]',
                borderColor: 'border-[#37f069]'
            }
            languageList.push(languageObject);
            finalObject.filters.language = languaeObject;
            languageFuse = new Fuse(languageList, options)
        }
    }
    let technologyArray = [];
    for (const technology of toolObject.filters.technology) {
        const technologySearch = await technologyFuse.search(technology) 
        if (technologySearch.length > 0) {
            technologyArray.push(technologySearch[0].item);
        } 
        else {
            let technologyObject = {
                name: technology,
                color: 'bg-[#61d0f2]',
                borderColor: 'border-[#40ccf7]'
            }
            technologyList.push(technologyObject);
            technologyArray.push(technologyObject);
            technologyFuse = new Fuse(technologyList, options)
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
    fs.writeFileSync(
        resolve(__dirname, '../../config', 'all-tags.json'),
        JSON.stringify({languages: languageList, technologies: technologyList}),
    )
}

module.exports = { combineTools }