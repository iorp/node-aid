// findRoot.js

const fs = require('fs');
const path = require('path');

function findRootFolder(currentPath) {
  // Check if package.json exists in the current directory
  const packageJsonPath = path.join(currentPath, 'package.json');

  if (fs.existsSync(packageJsonPath)) {
    // If package.json is found, it means we've reached the root folder
    return currentPath;
  } else {
    // If not found, move up one directory and continue the search
    const parentPath = path.resolve(currentPath, '..');

    // If the parentPath is the same as currentPath, we are at the filesystem root
    if (parentPath === currentPath) {
      return null; // Unable to find the root folder
    }

    return findRootFolder(parentPath);
  }
}
module.exports=findRootFolder