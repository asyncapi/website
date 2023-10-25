const { promises: { readFile, writeFile } } = require('fs');
const { convertToJson } = require('../utils');
const { resolve } = require('path');

module.exports = async function buildAdoptersList() {
    try {
        const AdoptersContent = await readFile('config/adopters/adopters.yml', 'utf-8');
        const jsonContent = convertToJson(AdoptersContent);
        
        await writeFile(
            resolve(__dirname, '../../config', 'adopters.json'),
            JSON.stringify(jsonContent)
        );
    } catch (err) {
        console.error(err);
        throw err;
    }
};
