

const readline = require('readline');

/**
 * Prompts the user with a confirmation question and expects a response from a set of options.
 *
 * @param {string} question - The confirmation question to ask the user.
 * @param {string[]} choices - List of valid options (default is ['y', 'n']).
 * @param {string} answer - If provided, automatically returns this value without prompting.
 * 
 * @returns {Promise<string>} The user's chosen option.
 * 
 * @throws {Error} If the user enters '!' to terminate the process.
 */
const promptForConfirm = async (question, choices = ['y', 'n'], answer = null) => { 
     answer = answer==true? 'y' : answer==false ? 'n'  : answer;
      
    if (answer!=null && answer!=undefined) return answer;
    choices.push('c');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    while (true) {
        const user_input = await new Promise((resolve) => {
            rl.question(`${question} (${choices.join('/')}): `, resolve);
        });

        const trimmedInput = user_input.trim().toLowerCase();

        if (choices.includes(trimmedInput)) {
            if (trimmedInput === 'c') {
                console.log('User has killed the process.');
                process.exit(1);
            }
            rl.close();
            return trimmedInput;
        } else {
            console.log("Invalid input. Please choose from the provided options.");
        }
    }
};


module.exports=promptForConfirm;