const { promises: { readFile, writeFile } } = require('fs');
const {convertToJson} = require("../scripts/utils")

module.exports = async function writeJSON(readPath, writePAth){
    try{
        const readContent = await readFile(readPath,'utf-8');
        const jsonContent = convertToJson(readContent);

        await writeFile(writePAth,JSON.stringify(jsonContent));
    }catch(error){
        console.log(error)
    }
}
