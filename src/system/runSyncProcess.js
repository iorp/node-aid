const {  spawnSync } = require('child_process');
 
 /**
 * Synchronously runs a child process with the given command and options.
 *
 * @param {string} command - The command to run, including any arguments.
 * @param {Object} options - Options for the child process execution.
 * @param {string} options.stdio - The stdio configuration for the child process. Defaults to 'inherit'.
 * @returns {Object} - An object indicating the success of the child process execution.
 * @throws {Object} - An object with error information if the child process encounters an error.
 */
function runSyncProccess(command,options={}) {
  var  {stdio='inherit'} = options;
  const arr = command.split(options);
  const cmd = arr[0];
  const args = arr.slice(1);

  const result = spawnSync(cmd, args, { stdio: 'inherit' });
 
  if(result.status==1){
    return { error: true, code: 'ChildProcessSyncError', exception: `Child process of '${cmd} ${args.join(' ')}' has failed look above.` };

  }

  // console.log(`Child process exited with code ${result.status}`);
  return { success: true };
}
 

module.exports =runSyncProccess;
