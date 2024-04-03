 
 

  
/**
 * Executes a command from a collection of classes in a Node.js environment.
 *
 * @param {Object} classCollection - An object containing classes or a class filled with classes,
 *                                   where each class represents a command.
 * @param {string} commandKey - The key corresponding to the command to be executed from the classCollection.
 * @param {number} argOffset - The offset in the process.argv array to start parsing command-line arguments.
 * @returns {Object} - An instance of the specified command class initialized with the parsed command-line arguments.
 *                    If the command is not found, returns an error object with details.
 *
 * @example
 * // Assuming you have a collection of command classes defined like this:
 * const classCollection = {
 *   CommandA: class CommandA { /* ... * / },
 *   CommandB: class CommandB { /* ... * / },
 *   // ...
 * };
 *
 * // To execute a command, call the executeFromCollection function:
 * const result = executeFromCollection(classCollection, 'CommandA', 2);
 * // The '2' in this example is the argOffset, assuming command-line arguments start from index 2 (e.g., 'node script.js CommandA arg1 arg2').
 *
 * // The result will be an instance of the CommandA class initialized with the parsed command-line arguments.
 * // If 'CommandA' is not found in the classCollection, an error object will be returned.
 */
function callDevCommand(classCollection, commandKey, argOffset) {
  const CommandClass = classCollection[commandKey];

  if (CommandClass === undefined) {
    console.log(`Command "${commandKey}" not found.`);
    return {
      'error': true,
      'code': 'CommandNotFound',
      'exception': 'Command not found',
      'command': commandKey
    };
  }

  return new CommandClass(process.argv.slice(argOffset));
}


module.exports = callDevCommand;