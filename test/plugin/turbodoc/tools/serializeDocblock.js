 

const serializeDocblock = require("../../../../src/plugin/turbodoc/tools/serializeDocblock");

 
 

  const docblockAll = `
  
/**
 * Demonstrates the usage of various JSDoc tags and elements.
 *
 * @function
 * @component
 * @name demoJSDoc
 * @param {string} name - The name parameter.
 * @param {string} [uri='default value'] - The path of the folder to start the conversion.
 * @param {Object} [options={}] - Optional configuration options for the \`traverse\` function.
 * @param {Function} [options.tagSetfileFilter=() => true] - A function to filter files based on custom criteria.
 * @throws {Error} Throws an error if age is less than 0.
 * 
 * @property {string} name - The name property. .
 * 
 * @typedef {Object} CustomType
 * @property {string} customProperty - Description of the custom property.
 *
 * @namespace
 * @description This namespace contains utility functions.
 *
 * @memberOf demoJSDoc
 * @function
 * @name sayHello
 * @param {string} greeting - The greeting parameter.
 * @returns {string} A formatted greeting.
 *
 * @example
 * const instance = demoJSDoc('John', 30);
 * console.log(instance.sayHello('Welcome')); // Outputs: "Welcome, John! Your age is 30."
 * 
 *
 * @ignore
 * @description This function will be ignored in documentation.
 */`;

 
  
   const docblockMinimal = `
   /**
    * Recursively converts a file structure into a JavaScript object.
    *
   * @param {string}    [uri='default value'] - The path of the folder to start the conversion.
   * @function
    */`;
   


  const result = serializeDocblock(docblockMinimal);
  console.log(result);
   