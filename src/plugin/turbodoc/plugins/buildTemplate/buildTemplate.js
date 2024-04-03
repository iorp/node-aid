 
 const fs = require('fs');
 const path = require('path'); 
 const deepMerge = require('../../../../object/deepMerge'); 
// const directoryExists = require('../../../../filesystem/directoryExists');
// const makeDirectory = require('../../../../filesystem/makeDirectory');
  const copy = require('../../../../../src/filesystem/copy'); 

const LiteResponsive  = require('../../../../../src/plugin/turbodoc/templates/LiteResponsive')



const buildTemplate =async (options={})=>{
   
  options = deepMerge({
   outputPath:null,
   template:LiteResponsive
  }, options || {});

  const {outputPath,template}=options;
 
  if(!outputPath) { console.error('buildTemplate: outputPath is required');process.exit(1);  }

  const response = await copy(path.join(template.dirname,'bundle'),outputPath,{merge:true})
 
 
 

 
    return response;
   }

 

 module.exports = buildTemplate;