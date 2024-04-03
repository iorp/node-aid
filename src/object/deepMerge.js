/**
 * Merges two objects recursively, with the ability to merge nested objects and arrays.
 *
 * @function
 * @param {Object} a - The target object to merge into.
 * @param {Object} b - The object to merge into the target.
 * @param {Object} options - Options for the merging behavior (default: { mergeArrays: true }).
 * @returns {Object} - The merged object.
 */ 
const deepMerge = (a, b, options = { mergeArrays: true }) => {
  // Check if a or b is not an object, or if they are arrays
  if (typeof a !== 'object' || typeof b !== 'object' || Array.isArray(a) || Array.isArray(b)) {
      return (Array.isArray(a) && Array.isArray(b) && options.mergeArrays) ? a.concat(b) : b;
  }

  const merged = a;//Object.assign({}, a);

  for (const key in b) {
      if (b.hasOwnProperty(key)) {
          // Handle special cases for functions and classes

          if ((typeof a[key] === 'function' ||  typeof b[key] === 'function')||typeof a[key] === 'class' ||  typeof b[key] === 'class') {
         
              merged[key] = b[key];
           } else if (typeof a[key] === 'object' && typeof b[key] === 'object' && !Array.isArray(b[key])) {
              // Recursively merge objects, excluding arrays
              merged[key] = deepMerge(a[key], b[key], options);
          } else if (Array.isArray(a[key]) && Array.isArray(b[key]) && options.mergeArrays) {
              // Merge arrays by combining their elements into a single array
              merged[key] = a[key].concat(b[key]);
          } else {
              // Default behavior for non-object, non-array properties
              merged[key] = b[key];
          }
      }
  }

  return merged;
};

module.exports = deepMerge;
