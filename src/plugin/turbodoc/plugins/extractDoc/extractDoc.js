 
 const fs = require('fs');
 const path = require('path');
 const hierarchyWalk = require('../../../../filesystem/hierarchyWalk')
 const deepMerge = require('../../../../object/deepMerge'); 
const directoryExists = require('../../../../filesystem/directoryExists');
const makeDirectory = require('../../../../filesystem/makeDirectory');
const makeFile = require('../../../../filesystem/makeFile'); 
 const flattenGano = require('./../../tools/flattenGano')

const extractDoc = (options={})=>{
     
  options = deepMerge({
    targetPath: null, 
    docPath:null,
    // outputPath:null,
    fileFilter: (filePath) => true,
    dirFilter: (dirPath) => true,
    onBegin:(data)=>{},
    onComplete: (data)=>{},
    operations:[ ]
  }, options || {});

  const {fileFilter,dirFilter,operations,targetPath,docPath,outputPath}=options;

  // if(!outputPath) { console.error('extractDoc: outputPath is required');process.exit(1);  }
  if(!targetPath) { console.error('extractDoc: targetPath is required');process.exit(1);  }
  if(!docPath) { console.error('extractDoc: docPath is required');process.exit(1);  }

  var response={
    operations:[]
}
const data ={
  cycle :{}, //data left by cycle operation 
  globals:{
    filesProcessed:0,
    operationsPerFile:operations.length,
    operationsPerformed:0

  } // global data of the whole execution 
}



  const runOperations =(filePath, level, isDirectory)=> {
    data.globals.filesProcessed++; 
    operations.forEach(operation => {
        const [method,args]= operation;
      response.operations.push(  method(args, {filePath, level, isDirectory},options,data));
        data.globals.operationsPerformed++;
    }); 
}
    if(targetPath===docPath)
      return {error:true,src:'turbodoc extractDoc',code:'wrongOutput',exception:'"targetPath" and "docPath" cannot be the same.'};

    if(!directoryExists(targetPath)) 
      return {error:true,src:'turbodoc extractDoc',code:'wrongTarget',exception:'"targetPath" must be a valid directory path."'+targetPath+'" is not.'};
 
    if(!directoryExists(docPath)) 
      makeDirectory(docPath);  
      if(typeof options.onBegin ==='function') options.onBegin(data);
      const hierarchyWalkResponse = hierarchyWalk(targetPath, { 
        fileFilter,
        dirFilter
    }, runOperations);
    if(hierarchyWalkResponse.error) return hierarchyWalkResponse; 
     

    response = {
      ...response,
      data,
      stats:{
        filesProcessed: data.globals.filesProcessed,
        operationsPerFile: data.globals.operationsPerFile,
        operationsPerformed: data.globals.operationsPerformed,

      }
    }


    // 
    if(data.globals.parsedMap){
      // json
      const makeGlobalJson = makeFile(path.join(docPath,'map.json'),JSON.stringify(data.globals.parsedMap,null,2));
      if(makeGlobalJson.error){console.error('extractDoc makeGlobalJson error.');process.exit(1);}
      // js

  
      // nested map 
      const makeGlobalJs = makeFile(path.join(docPath,'map.js'), `
      
      window.turbodoc_flat = ${JSON.stringify(flattenGano(data.globals.parsedMap))};
     
      
      ` );
       //window.turbodoc_map = ${JSON.stringify(data.globals.parsedMap)};
      if(makeGlobalJs.error){console.error('extractDoc makeGlobalJs error.');process.exit(1);}

      function flattenObject(node, result = {}, currentRoute = []) {
        if (node && typeof node === 'object') {
            const atKey = node['@'];
            if (atKey) {
                const key = currentRoute.join('.');
                result[key] = atKey;
            }
    
            for (const [key, value] of Object.entries(node)) {
                if (key !== '@') {
                    flattenObject(value, result, [...currentRoute, key]);
                }
            }
        }
    }
    
    const flatObject = {};
    flattenObject(data, flatObject);
    
    console.log(flatObject);
     

    }

    // in case any plugin put stuff 
    // global parsed terr
    if(data.globals.parsedTree){
      const makeGlobalJson = makeFile(path.join(docPath,'global.json'),JSON.stringify(data.globals.parsedTree,null,2));
      if(makeGlobalJson.error)return makeGlobalJson;
    }


    // global parsed terr
    if(data.globals.formatted){
     
      Object.keys(data.globals.formatted).forEach((format)=>{
       const makeGlobalFormatted = makeFile(path.join(docPath,'global.'+format),data.globals.formatted[format]);
        if(makeGlobalFormatted.error)return makeGlobalFormatted;
      })
      // todo remove from here end
      
    }

    if(typeof options.onComplete ==='function') options.onComplete(data);
    return response;
   }

 

 module.exports = extractDoc;