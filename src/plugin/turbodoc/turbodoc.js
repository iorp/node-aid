

 
const deepMerge = require('../../object/deepMerge'); 
const orchestrate=require('../../../src/function/orchestrate'); 

const   turbodoc= async (options={})=>{
options = deepMerge({
    plugins:[ 
      // see test 
     ]
},options)


 const orchestrateOptions={
   methods: options.plugins
 } 
 
 r =  await orchestrate(orchestrateOptions)
 
  return r;


}
 


module.exports = turbodoc;