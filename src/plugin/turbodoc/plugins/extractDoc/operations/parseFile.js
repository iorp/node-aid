 
 const fs = require('fs');
 const path = require('path'); 
 const makeDirectory = require('./../../../../../../src/filesystem/makeDirectory')
 const makeFile = require('./../../../../../../src/filesystem/makeFile'); 
 const oset = require('./../../../../../../src/object/oset');  
const deepClone = require('../../../../../object/deepClone');
const deepMerge = require('../../../../../object/deepMerge');
 
const parseJSJSON=require('../../../parsers/JsDocParser/parseJSJSON'); 
const readFile = require('./../../../../../../src/filesystem/readFile'); 
const writeFile = require('./../../../../../../src/filesystem/writeFile');  
const fileExists = require('./../../../../../../src/filesystem/fileExists');
const formatHTML = require('../../../formatters/formatHTML');
const LiteResponsive =  require('../../../templates/LiteResponsive');
 
const parseFile=(options,{filePath, level, isDirectory},pluginOptions,data)=>{
         // default options
         options = deepMerge({
          makeLocal:true,
          makeGlobal:true, 
          globalMode:'ram', 
          model:parseJSJSON,
          modelOptions:{  },

          renders:[
            [formatHTML,{
              extension:'html',
              suffix:'.raw'
            }],
            [formatHTML,{
              extension:'html',
              template:LiteResponsive
            }]
          ]
          
          
        }, options);

    const {model, modelOptions,makeLocal,makeGlobal,globalMode,renders}=options;
  
    const {docPath,targetPath}= pluginOptions;
    // generate output path
    var nodedocsPath = docPath + filePath.substring(targetPath.length);
    if(isDirectory){
        makeDirectory(nodedocsPath);
    }else{ 
    // set output path extension  *.turbodoc.json instead of .*, in this case instead of.js
   const  nodeOutputFilePath =  nodedocsPath.slice(0, nodedocsPath.lastIndexOf('.'));
     
        // create its place on globals parsedTree
        const globalFileTreePath =nodeOutputFilePath
        .substring(docPath.length)
        .replace(/\./,'')
        .split('\\')
        .filter(e => e !== "");
    
 
    // read js file 
    const fileContents = fs.readFileSync(filePath, 'utf-8');
   // pass extra data (filePath,...) and update route    to all elements 
    modelOptions.onAfterStoreNode= (collected, offset, lines, line, self) => {   




      if(collected['@'] ) {
        collected['@'] = {
          ...collected['@'], 
          location : filePath.substring(targetPath.length),
          uri:globalFileTreePath.join('/')+`.html#${collected['@'].name}`,
          route:  [
             ...filePath.slice(0, filePath.lastIndexOf('.')).substring(targetPath.length).split('\\').filter(element => element !== ""),
             ...collected['@'].route
          ]
        }
      }
 
  

 
    
    }; // This allows to modify the collected node data after being stored. 
 // apply the parser 
    const  parsedContents= model(fileContents,modelOptions);
 
    //makeLocal
    if(makeLocal){
 
        // json file 
          const jsonElementFilePath = nodeOutputFilePath+'.json';
         
          makeFile(jsonElementFilePath,JSON.stringify(parsedContents,null,2));

        //renders
        renders.forEach(element => {
          const [formatter,formatterOptions]=element;
          const formattedElementFilePath = nodeOutputFilePath+(formatterOptions.suffix||"")+'.'+formatterOptions.extension||'txt'
          
          var resultContents = formatter(parsedContents,formatterOptions);
        
          if(formatterOptions.template){ 
            
            const root = '../'.repeat(formattedElementFilePath.substring(docPath.length+1).split('\\').length-1)+'../'
            
            const map = readFile(path.join(docPath, 'map.json'),{datatype:'JSON'});
            if(map.error){console.error('Map error.');process.exit(1)}
            
           resultContents= formatterOptions.template.layout({map:map.data,root,main:resultContents,pluginOptions})
          }
          // wrap here the template if required 
          makeFile(formattedElementFilePath,resultContents);
          console.log("--"+formattedElementFilePath)
        
      });
 
  }
     
    // makeGlobal 
    if(makeGlobal){    
 
    // RAM 
    // place itself into globals parsed Tree
    if(globalMode==='ram'){
      oset(data.globals,['parsedTree',...globalFileTreePath],parsedContents)
    // ROM 
    }else{
      // open file, write file,  close file  
    const globalPath = path.join(docPath,'global.json')
     if(!fileExists(globalPath)) makeFile(globalPath,'{}');
      const read = readFile(globalPath,{datatype:'JSON'});
      if(read.error){console.error(read);return {error:true}}
      const newTree = oset(read.data,globalFileTreePath,parsedContents);
      const written = writeFile(globalPath,newTree,{datatype:'JSON'});
      if(written.error){console.error(written);return {error:true}} 

    }
    }

    


    // store cycle data for the nexxt operation 
    data.cycle = {
        ...data.cycle,
        parsed:parsedContents
    };
    return {
        'operation':'parseFile', 
        result: {success:true,output:nodeOutputFilePath}
    }
    }
  }
module.exports=parseFile;  