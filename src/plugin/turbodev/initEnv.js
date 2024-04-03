 
const fs = require('fs');
const path = require('path'); 
const writeFile  = require('./../../filesystem/writeFile')
const writeEnvFile  = require('./../../plugin/turbodev/writeEnvFile')
 

  
/**
 * Initialize environment variables and update package.json keys.
 *
 * @param {Object} environment - The environment object containing key-value pairs for the .env file.
 * @param {Object} environmentToPackageKeys - The keys to be merged with package.json.
 *                                             Example: { 'homepage': 'REACT_APP_HOMEPAGE' }
 *
 * @throws {Object} - Throws an error object with details about the encountered issue.
 * @property {number} error - Error code (1 for missing environment, 1 for missing package.json, etc.).
 * @property {string} code - Error code for easy identification.
 * @property {string} exception - Detailed exception message.
 */
function initEnv(environmentName, environments, environmentToPackageKeys = null, callback=null,basePath=null,verbose=false) {
  try {
   
      basePath = basePath? basePath:process.cwd();
      var environment = environments[environmentName];
      // Check if the provided environment exists
      if (!environment) throw {'error': 1,'code': 'DevjsWrongEnvironmentName','exception': `There is no environment named that way.` };

      // Write .env file
      var  envFilePath = path.join(basePath, '/.env');
      var r = writeEnvFile(envFilePath , environment);
      if (r.error)  throw r;

      if (environmentToPackageKeys) {
          // Update homepage and other package.json keys
          const packagePath = path.join(basePath, '/package.json');
          Object.keys(environmentToPackageKeys).forEach(key => {
              environmentToPackageKeys[key] = environment[environmentToPackageKeys[key]];
          });

          if (!fs.existsSync(packagePath)) {
              throw {
                  'error': 1,
                  'code': 'DevjsMissingPackage',
                  'exception': 'There is no package.json file!'
              };
          }

          r = writeFile(packagePath, environmentToPackageKeys, {datatype:'JSON',merge:true});
          if (r.error) throw result;
      }
      r = { 'code': 'DevjsDevInitSuccess' };
      if(verbose) console.log(r);
      if(typeof callback==='function') callback(environmentName)
      return r; 
  } catch (e) {
      if(verbose) console.log(e)
      return e;
  
  }
}
module.exports = initEnv;