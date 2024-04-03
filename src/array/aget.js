

  /**
   * Retrieves a value from a nested object or array based on the provided path.
   *
   * @param {Object|Array} data - The object or array from which to retrieve the value.
   * @param {string|Array} path - The path to the desired value, either as a dot-separated string or an array of keys.
   * @param {Object} [options={}] - Additional options.
   *   @param {string} [options.idKey='key'] - The variable name to use for keys.
   *   @param {string} [options.childrenKey='children'] - The variable name to use for children arrays.
   *   @param {*} [options.defaultValue=null] - The default value to return if the path does not exist.
   * @returns {*} - The retrieved value or the default value if the path does not exist.
   */
  function aget(data, path, options = { }) {
    const {defaultValue=null,idKey='key',childrenKey= 'children'}=options;
   
    if(typeof path=='string') path = path.split('.');
      let current = data;
    
      for (const [index, key] of path.entries()) {
          if (typeof current === 'object' && !Array.isArray(current)) {
              if (current[key]) {
                  current = current[key];
              } else {
                  if (current[childrenKey]) {
                      current = current[childrenKey].find(item => item?.[idKey] === key);
                  } else {
                      return defaultValue;
                  }
              }
          } else if (typeof current === 'object' && Array.isArray(current)) {
              current = current.find(item => item?.[idKey] === key);
          }
      }
    
      return current;
    }
   
  
 
module.exports =aget;