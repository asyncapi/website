const { getData } = require('./tools/extract-tools-github');
const { convertTools } = require('./tools/tools-object');
const { combineTools } = require('./tools/combine-tools');
const manualTools = require('../config/tools-manual.json')

const fs = require('fs');
const { resolve } = require('path');

const combineAutomatedAndManualTools = async (automatedTools) => {
    try {
        await combineTools(automatedTools, manualTools);
    } catch (err) {
        console.log("Error while combining tools:", err);
        throw err;
    }
};

const buildTools = async () => {
    try {
        let githubExtractData = await getData();
        let automatedTools = await convertTools(githubExtractData);
        fs.writeFileSync(
            resolve(__dirname, '../config', 'tools-automated.json'),
            JSON.stringify(automatedTools, null, '  ')
        );
        await combineAutomatedAndManualTools(automatedTools);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const buildToolsManual = async () => {
    try {
        const automatedTools = require('../config/tools-automated.json');
        await combineAutomatedAndManualTools(automatedTools);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

if (require.main === module) {
    buildTools();
}

module.exports = {
    buildTools,
    buildToolsManual
};