const { spawn } = require('child_process');
const util = require('util');
 
/**
 * Asynchronously runs a child process with the given command and options.
 *
 * @param {string} command - The command to run, including any arguments.
 * @param {function} callback - A callback function to be executed upon completion of the child process.
 * @param {Object} options - Options for the child process execution.
 * @param {string} options.stdio - The stdio configuration for the child process. Defaults to 'inherit'.
 * @returns {Promise} - A promise that resolves when the child process exits, indicating the success of the execution.
 * @throws {Object} - An object with error information if the child process encounters an error.
 */
async function runAsyncProcess(command, callback,options={}) {
  var  {stdio='inherit'} = options;
  const arr = command.split(' ');
  const cmd = arr[0];
  const args = arr.slice(1);

  try {
    const childProcess = await util.promisify(spawn)(cmd, args, options);

    // Use a Promise to wait for the subprocess to exit
    const onClose = new Promise((resolve) => {
      childProcess.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
        if (callback && typeof callback === 'function') {
          callback({ success: code === 0, code: code });
        }
        resolve();
      });
    });

    // Return the promise that resolves when the subprocess exits
    return onClose;
  } catch (error) {
    // Handle any errors that might occur during the spawn process
    console.error('Error:', error.message);
    if (callback && typeof callback === 'function') {
      callback({ error: true, code: 'ErrorCode', exception: 'bla bla' });
    }
    throw error; // Rethrow the error for the calling code to handle
  }
}

module.exports =runAsyncProcess;
