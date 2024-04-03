
const findRootFolder = require('./../../src/filesystem/findRootFolder');

// Find the root folder and print the result
const rootFolder = findRootFolder(process.cwd());

if (rootFolder) {
  console.log(`Root folder of the project: ${rootFolder}`);
} else {
  console.log('Unable to find the root folder of the project.');
}