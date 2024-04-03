//
const callDevCmd=require('../../../src/plugin/turbodev/callDevCmd');
// GreetCommand.js


/* @note use example as 
node test/plugin/turbodev/callDevCmd.js greet 'World'
node test/plugin/turbodev/callDevCmd.js help other stuf 123
*/

class GreetCommand {
    constructor(args) {
      this.args = args;
      this.execute();
    }
  
    execute() {
      console.log(`Hello, ${this.args[0]}!`);
    }
  }
  
  // HelpCommand.js
  class HelpCommand {
    constructor(args) {
      this.args = args;
      this.execute();
    }
  
    execute() {
      console.log("Displaying help information...");
    }
  }
  
 
const classCollection = {
  greet: GreetCommand,
  help: HelpCommand,
  // Add more commands as needed
};
 
// Example usage:
const commandKey = process.argv[2]; // Assuming the command key is provided as the third argument
const r = callDevCmd(classCollection, commandKey, 3); // Assuming command-line arguments start from index 3
console.log(r)
// No need to call result.execute() since the behavior is handled in the constructor


// now call in console with argument greet or help