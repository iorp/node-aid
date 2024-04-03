 
 
const fs = require('fs');
const path = require('path');  


/**
 * Recursively iterates through a folder, applying a callback for each file and folder.
 * @deprecated
 * @param {string} uri - The path of the folder to iterate.
 * @param {Function} callback - The callback function to apply for each file and folder.
 * @param {Object} [options={}] - Optional configuration options.
 * @param {Function} [options.fileFilter=() => true] - A function to filter files based on custom criteria.
 * @param {Function} [options.dirFilter=() => true] - A function to filter directories based on custom criteria.
 */
function traverse(uri, callback, options = {},level=0) {
    // console.log('[iterate]','uri',uri)
     // Destructure options with default values
     var { fileFilter = () => true, dirFilter = () => true } = options;
   
     // Read the contents of the folder synchronously
     fs.readdirSync(uri).forEach(file => {
       // Construct the full path of the file or directory
       const filePath = path.join(uri, file);
   
       // Check if it's a directory
       if (fs.statSync(filePath).isDirectory()) {
         // Check if the directory passes the custom filter
         if (dirFilter(filePath)) {
           // Recursively iterate through the subdirectory
           traverse(filePath, callback, options,level+1);
         }
       } else {
         // It's a file, check if it passes the custom filter
         if (fileFilter(filePath)) {
           // Invoke the callback for each file
           callback(filePath,level);
         }
       }
     });
   }
   module.exports = traverse;
   