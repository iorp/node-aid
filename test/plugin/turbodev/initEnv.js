const fs = require('fs').promises;
const path = require('path');

const generateHierarchy=require('../../../src/filesystem/generateHierarchy');
const initEnv=require('../../../src/plugin/turbodev/initEnv');

const tempPath =path.join('./test/.temp/initEnv');  
var r;
// # Create a temp for tests   
(async ()=>{
     r =await generateHierarchy(tempPath, [
        { type: 'file', name: 'package.json', content: {
            name:'test',
            
        } }, 
    ],{verbose:true,overwrite:true});
     
    
    console.log(r);
    if(r.error)process.exit(1)
 
// the environments are at ./dev.js normally 
   const Environments={
        'production':{
            REACT_APP_HOMEPAGE: 'http://production.com/build'
        },
        'development':{
            REACT_APP_HOMEPAGE: 'http://development.com:3000/'
        }
    }


   r = initEnv('development',Environments, { 'homepage': 'REACT_APP_HOMEPAGE' },(envName)=>{console.log(envName,' optional callback')},tempPath); 
   console.log(r);
    if(r.error) process.exit(1)
// # Test start
  
//   r =  readEnvFile(path.join(__dirname, "./../../temp/readEnvFile/.env"))
 
//    console.log(r);
})();



 