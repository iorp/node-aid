const fs = require('fs');
const path = require('path');
const findRootFolder = require('../../../../src/filesystem/findRootDirectory');
const turbodoc = require('./../../../../src/plugin/turbodoc');

// Find the root folder and print the result
const rootFolder = findRootFolder(process.cwd());

const configPath = path.join(rootFolder, 'turbodoc.config.js');
var config;
(async ()=>{
if (fs.existsSync(configPath)) {
    config = require(configPath);
}
 


console.log(config)

const r = await turbodoc(config);

console.log(r)
})();
