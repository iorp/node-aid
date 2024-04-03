const fs = require('fs');
const path = require('path');

/**
 * Recursively iterates through a folder, applying a callback for each file and folder.
 *
 * @param {string} uri - The path of the folder to iterate.
 * @param {Object} [options={}] - Optional configuration options.
 * @param {Function} [options.fileFilter=() => true] - A function to filter files based on custom criteria.
 * @param {Function} [options.dirFilter=() => true] - A function to filter directories based on custom criteria.
 * @param {Function} callback - The callback function to apply for each file and folder.
 * @param {number} [level=0] - The current level of recursion.
 */
function hierarchyWalk(uri, options = {}, callback, level = 0) {
    // Destructure options with default values
    const { fileFilter = () => true, dirFilter = () => true } = options;

    // Read the contents of the folder synchronously
    fs.readdirSync(uri).forEach(file => {
        // Construct the full path of the file or directory
        const filePath = path.join(uri, file);

        // Check if it's a directory
        if (fs.statSync(filePath).isDirectory()) {
            // Check if the directory passes the custom filter
            if (dirFilter(filePath)) {
                // Recursively iterate through the subdirectory
                hierarchyWalk(filePath, options, callback, level + 1);
                // Invoke the callback for each directory
                callback(filePath, level, true);
            }
        } else {
            // It's a file, check if it passes the custom filter
            if (fileFilter(filePath)) {
                // Invoke the callback for each file
                callback(filePath, level, false);
            }
        }
    });
    return {success:true}
}
module.exports= hierarchyWalk;