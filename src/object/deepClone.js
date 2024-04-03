

  
/**
 * Creates a deep clone of the provided object.
 *
 * This function handles circular references and preserves non-JSON serializable values.
 *
 * @function
 * @param {Object} obj - The object to be cloned.
 * @param {Map} [cloneMap=new Map()] - Internal map to track circular references during cloning (used for recursion).
 * @returns {Object} - A deep clone of the provided object.
 */
function deepClone(obj, cloneMap = new Map()) {
    // Handle non-object types and null
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // Check if the object has been cloned before (circular reference)
    if (cloneMap.has(obj)) {
        return cloneMap.get(obj);
    }

    // Create a new object or array based on the type of the input object
    const clone = Array.isArray(obj) ? [] : {};

    // Store the clone in the map to handle circular references
    cloneMap.set(obj, clone);

    // Recursively clone each property of the object
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key], cloneMap);
        }
    }

    return clone;
}

 module.exports = deepClone;