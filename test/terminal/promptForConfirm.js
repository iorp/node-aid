 
const promptForConfirm=require('../../src/terminal/promptForConfirm');

var r;
// Example usage:
(async () => {
      r = await promptForConfirm("Do you want to continue?", ['y', 'n'], 'n');
    console.log(`User chose: ${r}`);
 
    r = await promptForConfirm("Do you want to continue?", ['y', 'n'], true);
    console.log(`User chose: ${r}`);

      r = await promptForConfirm("Do you want to continue?", ['y', 'n']);
    console.log(`User chose: ${r}`);
})();
