
/**
 * Recursively iterates through a hierarchical data structure and applies a callback function to each item.
 *
 * @param {Array} data - The array representing the hierarchical data structure.
 * @param {Function} callback - The callback function to apply to each item in the data structure.
 *   It receives three parameters: the current item, the options object, and the path to the current item in the hierarchy.
 * @param {Object} [options={}] - Additional options to be passed to the callback function.
 *   @param {string} [options.idKey='key'] - The variable name to use for item.key.
 *   @param {string} [options.childrenKey='children'] - The variable name to use for item.children.
 * @param {Array} [path=[]] - The path to the current item in the hierarchy (used internally during recursion).
 * @returns {Array} - A new array representing the transformed data structure.
 */
function arec(data, callback, options = {}, path = []) {
    const {idKey='key',childrenKey= 'children'}=options;
   
    return data.map(item => {
   
        const currentPath = [...path, item[idKey]];
        const newItem = callback(item, currentPath,options  ) || item;
  
        if (item[childrenKey] && item[childrenKey].length > 0) {
            newItem[childrenKey] = arec(item[childrenKey], callback, options, currentPath);
        }
  
        return newItem;
    },
    {idKey:'name'});
  }
   
    
module.exports = arec