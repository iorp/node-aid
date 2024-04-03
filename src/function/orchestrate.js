/**
 * Orchestrates the execution of methods in a specified order.
 *
 * @async
 * @function
 * @param {Object} options - The options object containing methods to orchestrate.
 * @param {Array} options.methods - An array of methods to execute.
 *
 * @returns {Promise<Object>} - A Promise that resolves to the response object after orchestrating the methods.
 *
 * @example
 * // Usage example
 * const result = await orchestrate({
 *   methods: [
 *     ['nativeMethod', args1],
 *     [customFunction, args2],
 *     // Add more methods as needed
 *   ]
 * });
 */
const deepMerge = require('../../src/object/deepMerge');

const orchestrate = async (options = {}) => {
  // Merge the provided options with default options
  options = deepMerge({
    methods: [],
  }, options);

  const { methods } = options;
  // Initialize the response object
  var response = {
    methods: [],
  };

  // Define a NativeMethod with a dummy method
  const NativeMethod = {
    dummy: async ({}) => { console.log({}); }
  };

  // Loop through each method and execute accordingly
  for (var i = 0; i < methods.length; i++) {
    const methodData = methods[i];

    // Check if methodData is an array
    if (Array.isArray(methodData)) {
      const [providedMethod, args] = methodData;

      // Check if providedMethod is a string (Native method)
      if (typeof providedMethod === 'string') {
        // Check if the Native method exists and is a function
        if (typeof NativeMethod[providedMethod] === 'function') {
          // Execute the Native method and update the response
          response.methods = [...response.methods, { providedMethod, response: await NativeMethod[providedMethod](args) }];
        } else {
          // Log an error and exit the process if the Native method doesn't exist
          console.error('[orchestrate] "' + methodData + '" is not a Native method.');
          process.exit(1);
        }
      } else if (typeof providedMethod === 'function') {
        // Execute the custom function and update the response
        response.methods = [...response.methods, { providedMethod, response: await providedMethod(args) }];
      } else {
        // Log an error and exit the process if the methodData is not valid
        console.error('[orchestrate]: "' + methodData + '" is not a valid method.');
        process.exit(1);
      }
    } else {
      // Log an error if methodData is not an array
      console.error('[orchestrate]: MethodData must be an array.');
    }
  }

  // Return the final response object
  return response;
};

module.exports = orchestrate;
