const fs = require('fs');
const path = require('path');

function makeDirectory(folderPath) {
    // Split the path into individual directories
    const folders = folderPath.split(path.sep);

    // Create each folder path if it doesn't exist
    let currentPath = '';
    folders.forEach(folder => {
        currentPath = path.join(currentPath, folder);
        if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath);
        }
    });

    return {
        success:true
    }
}

module.exports = makeDirectory
 
