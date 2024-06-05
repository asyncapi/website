const { resolve } = require('path');
const writeJSON = require('../utils/write-json')

module.exports = async function buildAdoptersList() {
    writeJSON('config/adopters.yml',resolve(__dirname, '../../config', 'adopters.json'));
};
