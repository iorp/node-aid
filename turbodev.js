 // note not used yet 
 
const os = require('os');
const fs = require('fs');
const path = require('path');


const callDevCmd=require('./src/plugin/turbodev/callDevCmd');

// locally import Drafter
// const Drafter=require('./src/plugin/turbodoc/Drafter');

 
 

/**
 * CommandCollection object containing development command logic.
 */
const CommandCollection = {
  after: class {
     
    },
  init: class {
    /**
     * Constructor for the prestart command.
     * @param {Array} argv - The command line arguments.
     * @param {string} argv.0 - An argument

     * call as init development|production|distribution
     */
    constructor(argv) {  
     console.log(argv)
    }
  }
  
}

// Call the specified command from the CommandCollection based on the command line argument.
// Example usage: node yourScript.js prestart
// This will execute the prestart logic and initialize the development environment.
callDevCmd(CommandCollection, process.argv[2], 3);
