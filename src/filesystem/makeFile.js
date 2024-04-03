const fs = require('fs');
const path = require('path');

/**
 * Creates a file with the given content, creating directories if needed.
 *
 * @param {string} filePath - The path of the file to create.
 * @param {string} content - The content to write to the file.
 * @param {Object} [options={}] - Optional configuration options.
 * @param {boolean} [options.append=false] - If true, appends content to the file if it exists.
 * @param {boolean} [options.overwrite=true] - If true, overwrites the file if it exists.
 */
function makeFile(filePath, content="", options = {}) {
    const { append = false, overwrite = true } = options;

    // Split the path into individual directories and the file name
    const folders = filePath.split(path.sep);
    const fileName = folders.pop();
    const directoryPath = folders.join(path.sep);

    // Create directories
    if (directoryPath) {
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
    }

    // Full path of the file
    const fullPath = path.join(directoryPath, fileName);

    // Check if the file exists
    if (fs.existsSync(fullPath)) {
        // Handle options for appending and overwriting
        if (overwrite) {
            fs.writeFileSync(fullPath, content);
        } else if (append) {
            fs.appendFileSync(fullPath, content);
        }
    } else {
        // File doesn't exist, create and write content
        fs.writeFileSync(fullPath, content);
    }
    return {
        success:true
    }
}

module.exports = makeFile;
