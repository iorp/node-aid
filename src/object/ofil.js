/**
 * Filters out specified keys from an object and returns a new object.
 *
 * @param {Object} obj - The input object.
 * @param {string|string[]} keys - An array of keys to be removed from the object. Or a single key.
 * @returns {Object} - A new object with specified keys removed.
 */
const ofil = (obj, keys) => {
    keys = typeof keys ==='string'?[keys]:keys;
    return Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key)));
  };
  module.exports =ofil;