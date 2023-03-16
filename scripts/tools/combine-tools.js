const { languagesColor, technologiesColor } = require("./tags-color")
const { categoryList } = require("./categorylist.js")
const { createToolObject } = require("./tools-object")
const fs = require('fs')
const schema = require("./tools-schema.json");
const Ajv = require("ajv")
const addFormats = require("ajv-formats")
const { resolve } = require('path');
const Fuse = require("fuse.js")
const ajv = new Ajv()
addFormats(ajv, ["uri"])
const validate = ajv.compile(schema)

let finalTools = {};
for (var category of categoryList) {
    finalTools[category.name] = {
        description: category.description,
        toolsList: []
    };
}

// Config options set for the Fuse object
const options = {
    includeScore: true,
    shouldSort: true,
    threshold: 0.39,
    keys: ['name', 'color', 'borderColor']
}

// Two seperate lists and Fuse objects initialised to search languages and technologies tags 
// from specified list of same.
let languageList = [...languagesColor], technologyList = [...technologiesColor];
let languageFuse = new Fuse(languageList, options), technologyFuse = new Fuse(technologyList, options)

// takes individual tool object and inserts borderColor and backgroundColor of the tags of 
// languages and technologies, for Tool Card in website.
const getFinalTool = async (toolObject) => {
    let finalObject = toolObject;

    //there might be a tool without language
    if (toolObject.filters.language) {
        const languageSearch = await languageFuse.search(toolObject.filters.language)
        if (languageSearch.length) {
            finalObject.filters.language = languageSearch[0].item;
        }else{
             // adds a new language object in the Fuse list as well as in tool object
             // so that it isn't missed out in the UI.
            let languageObject = {
                name: finalObject.filters.language,
                color: 'bg-[#57f281]',
                borderColor: 'border-[#37f069]'
            }
            languageList.push(languageObject);
            finalObject.filters.language = languageObject;
            languageFuse = new Fuse(languageList, options)
        }
    }
    let technologyArray = [];
    if(toolObject.filters.technology){
    for (const technology of toolObject?.filters?.technology) {
        const technologySearch = await technologyFuse.search(technology) 
        if (technologySearch.length > 0) {
            technologyArray.push(technologySearch[0].item);
        } 
        else {
            // adds a new technology object in the Fuse list as well as in tool object 
            // so that it isn't missed out in the UI.
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
    }
    finalObject.filters.technology = technologyArray;
    return finalObject;
}


// Combine the automated tools and manual tools list into single JSON object file, and 
// lists down all the language and technology tags in one JSON file.
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
                let isAsyncAPIrepo;
                const isValid = await validate(tool)
                if(isValid) {
                    if(tool?.links?.repoUrl){
                        const url = new URL(tool.links.repoUrl)
                        isAsyncAPIrepo = url.href.startsWith("https://github.com/asyncapi/")
                    }else isAsyncAPIrepo = false
                    let toolObject = await createToolObject(tool, "", "", isAsyncAPIrepo)
                    finalToolsList.push(await getFinalTool(toolObject))
                }else{
                    console.error('Script is not failing, it is just dropping errors for further investigation');
                    console.error(`Invalid ${tool.title} .asyncapi-tool file.`);
                    console.error(`Located in manual-tools.json file`);
                    console.error('Validation errors:', JSON.stringify(validate.errors, null, 2));
                }
            }
        }
        finalToolsList.sort((tool, anotherTool) => tool.title.localeCompare(anotherTool.title));
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