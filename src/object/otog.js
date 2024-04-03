const oget=require('../../src/object/oget');
const oset=require('../../src/object/oset');

 /**
 * Toggles the boolean-ish value at the specified path within the target object.
 *
 * @function
 * @param {Object} target - The target object to modify.
 * @param {Array} path - The path to the boolean value within the target object.
 * @returns {Object} - The modified target object.
 */
 function otog(target,path) {
    const previousValue =  oget(target,path); 
    return oset(target,path,!previousValue) ; 
    
  }

  module.exports = otog;