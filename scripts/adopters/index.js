const { readdir, writeFile, readFile } = require('fs').promises;
const { convertToJson } = require('../utils');
const { resolve } = require('path');

module.exports = async function buildAdoptersList() {
    let AdoptersList = [];
    try {
            const AdoptersContent = await readFile('config/adopters/adopters.yml', 'utf-8');
            const jsonContent = convertToJson(AdoptersContent);
            
            AdoptersList.push(jsonContent);
            await writeFile(
                resolve(__dirname, '../../config', 'adopters.json'),
                JSON.stringify(AdoptersList)
            )
        }
     catch (err) {
        console.log(err);
        throw err
    }
};