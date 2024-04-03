

/**
 * Sets a value at a specified path in an object. Optionally merges with existing values.
 *
 * @function
 * @param {Object} target - The target object to set the value in.
 * @param {string|array} path - The path at which to set the value.
 * @param {any} value - The value to set at the specified path.
 * @param {boolean} merge - If true, merge the new value with existing values at the path.
 * @returns {Object} - The modified target object.
 */
function oset(target,path, value, merge) {

     
    if (!target) console.error("set: No target provided")
    if (!path) console.error("set: No path provided")

    if (path == "") {
        target = value;
    } else {

        let current = target;
        if (typeof path === 'string') path = path.split('.');
        for (let i = 0; i < path.length; i++) {
            if (current[path[i]]===undefined) current[path[i]] = {};

            if (i == path.length - 1) {

                if (merge) {
                    Object.assign(current[path[i]], value)
                } else {
                    current[path[i]] = value;
                }

            } else {
                //SET NEXT NODE
                current = current[path[i]];
            }
        }
    }

    // Set operation returns modified root object 
    return target

}
module.exports = oset;