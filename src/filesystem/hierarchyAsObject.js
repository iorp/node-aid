 
 
const fs = require('fs'); 

const traverse=require('./traverse');
const fileExists= require('./fileExists');

/**
   * Recursively converts a file structure into a JavaScript object.
   *
   * @param {string} uri - The path of the folder to start the conversion.
   * @param {Object} [options={}] - Optional configuration options for the `traverse` function.
   * @param {Function} [options.fileFilter=() => true] - A function to filter files based on custom criteria.
   * @param {Function} [options.dirFilter=() => true] - A function to filter directories based on custom criteria.
   * @param {Function} [options.fileKeyValue=(uri, name) => { return { key: name, value: fs.readFileSync(uri, 'utf-8') }; }] - Controls how the KeyValue pair of the files is built. WARNING: It must return an object like { key: string, value: any }. By default, Key will be filename, and Value will be the file content.
   * @param {Function} [options.dirKey=(uri, name) => { return { key: name} }] - Controls how the Key of the folders is built. WARNING: It must return an object like { key: string }. By default, Key will be directory name.
   * @returns {Object} - The resulting JavaScript object representing the file structure.
   */
function hierarchyAsObject(uri, options = {}) {
    var {
      fileFilter = () => true,
      dirFilter = () => true,
      fileKeyValue =null,
      dirKey =null,
    } = options;
    
     dirKey = typeof dirKey==='function'? dirKey :(uri, name)=>{ return {key:name}};
     fileKeyValue =  typeof fileKeyValue==='function'? fileKeyValue :(uri, name) => ({ key: name, value: fs.readFileSync(uri, 'utf-8') });
 
    const tree = {};
     /**
     * Default callback function for the traverse function.
     * @param {string} uri - The path of the current file or folder.
     */
    function addToTree(uri) {
             
        uri = uri.replace(/\\/ig, '/');
        
         const parts = uri.split('/'); 
 
      // Reference to the current position in the tree
      let current = tree;
      
      // Traverse the path and create objects as needed
      for (let i = 0; i < parts.length; i++) {
        var part = parts[i]; 
        if (!current[part]) {
          // If it's the last part and a file, set the value based on the fileKeyValue function 
            if (i === parts.length - 1 && fileExists(uri)) {
            
                const { key, value } = fileKeyValue(uri, part);
            current[key] = value;
            part = key; 
          } else {
            // If it's a directory or not the last part, create an object
          //  const { key } =dirKey(uri, part);
            current[part] = {};

          
          }
        }
        current = current[part];
      }
    }
  
    // Use the traverse function with customCallback if provided; otherwise, use the default callback
    const callbackFunction = addToTree;
    traverse(uri, callbackFunction, { fileFilter, dirFilter });
  
    return tree;
  }
  
  module.exports = hierarchyAsObject;