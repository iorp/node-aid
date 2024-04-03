
  /**
  * Sets a value in a nested object or array based on the provided path.
  *
  * @param {Object|Array} data - The object or array in which to set the value.
  * @param {string|Array} path - The path to the desired value, either as a dot-separated string or an array of keys.
  * @param {*} value - The value to set.
  * @param {Object} [options={}] - Additional options.
  *   @param {string} [options.idKey='key'] - The variable name to use for keys.
  *   @param {string} [options.childrenKey='children'] - The variable name to use for children arrays.
  * @returns {Object|Array} - The modified data object or array.
  */
  function aset(data, path, value, options = {  }) {
    const {idKey='key',childrenKey= 'children'}=options;
  
    if (typeof path === 'string') path = path.split('.');
    let current = data;
  
    for (const [index, key] of path.entries()) {
        if (typeof current === 'object' && !Array.isArray(current)) {
            if (index === path.length - 1) {
                current[key] = value;
            } else if (current[key]) {
                current = current[key];
            } else {
                if (current[childrenKey] && current[childrenKey].find(item => item?.[idKey] === key)) {
                    current = current[childrenKey].find(item => item?.[idKey] === key);
                } else {
                    current[key] = value;
                }
            }
        } else if (typeof current === 'object' && Array.isArray(current)) {
            current = current.find(item => item?.[idKey] === key);
        }
    }
  
    return data;
  }
  
  

module.exports =aset;