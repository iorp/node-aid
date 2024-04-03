
/**
 * Iterates over key-value pairs in an object recursively, applying a callback function.
 *
 * @function
 * @param {Object} nodes - The target object to iterate over.
 * @param {Function} fn - The callback function to apply to each key-value pair.
 * @param {number} [level=0] - The depth level of the current iteration, ignore it.
 * @param {Array} [path=[]] - The path of ancestor keys to the current node.
 * @returns {Object} - The modified target object.
 */
function orec(nodes, fn, level = 0, path = []) {
    let siblingIndex = 0; // Initialize siblingIndex for the current level

    for (let nodeKey in nodes) {
        if (nodes.hasOwnProperty(nodeKey)) {
            const node = nodes[nodeKey];

            // Build the current path by appending the current key
            const currentPath = [...path, nodeKey];

            // Call the callback function for the current key-value pair
            fn({nodeKey, node,nodes, currentPath, level, siblingIndex});

            // If the value is an object, recursively iterate over it
            if (typeof node === 'object' && node !== null) {
                orec(node, fn, level + 1, currentPath);
             }

            // Increment sibling index for the next iteration
            siblingIndex++;
        }
    }
    return nodes;
}
module.exports = orec;