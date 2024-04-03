
/**
 * Gets the value at a specified path in an object.
 *
 * @function
 * @param {Object} target - The target object to get the value from.
 * @param {string|array} path - The path at which to get the value.
 * @param {Any} [defaultValue=null] - Default value
 * @returns {any} - The value at the specified path or null if not found.
 */
function oget(target,path,defaultValue=null) { 
    if (!target) console.error("No object provided")
    if (!path) console.error("No path provided")

    if ((path === "")) return target;

    var current = target;
    
    if (typeof path === 'string') path = path.split('.');
    for (let i = 0; i < path.length; i++) {
        
        if (current[path[i]]==undefined) return defaultValue;  
        current = current[path[i]];
    } 
 
    return current||defaultValue;;

}

module.exports = oget;