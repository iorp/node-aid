
/**
 * Deletes the value at a specified path in an object, optionally removing empty parent nodes.
 *
 * @function
 * @param {Object} target - The target object to delete the value from.
 * @param {string|array} path - The path at which to delete the value.
 * @param {boolean} removeParentIfEmpty - If true, remove empty parent nodes.
 * @returns {Object} - The modified target object.
 */
function odel(target,path, removeParentIfEmpty) {
 
 
    if (!path || path == "") console.error("No path provided")
    if (!target || target == "") console.error("No object provided")

    let current = target;
    let parent = null;
    if (typeof path === 'string') path = path.split('.');
    for (let i = 0; i < path.length; i++) {
        if (current[path[i]]==undefined) return target;
        if (i == path.length - 1) {
            delete current[path[i]];
            if (removeParentIfEmpty && parent != null) {
                delete parent[path[i - 1]];
            }
        } else {
            //SET NEXT NODE
            parent = current;
            current = current[path[i]];
        }
    }

    // Delete operation returns modified root object 
    return target;

}
module.exports = odel;