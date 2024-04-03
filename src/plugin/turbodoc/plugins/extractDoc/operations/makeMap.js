 
 const fs = require('fs');
 const path = require('path'); 
 const makeDirectory = require('../../../../../filesystem/makeDirectory')
 const makeFile = require('../../../../../filesystem/makeFile'); 
 const oset = require('../../../../../object/oset');  
const deepClone = require('../../../../../object/deepClone');
const deepMerge = require('../../../../../object/deepMerge');
 
const parseJSJSON=require('../../../parsers/JsDocParser/parseJSJSON'); 
const readFile = require('../../../../../filesystem/readFile'); 
const writeFile = require('../../../../../filesystem/writeFile');  
const fileExists = require('../../../../../filesystem/fileExists');
const formatHTML = require('../../../formatters/formatHTML');
 
const makeMap=(options,{filePath, level, isDirectory},pluginOptions,data)=>{
  function filterJsDocKeys(obj,keys) {
    const filter = (key)=>{ 
      return keys.includes(key);
    }
    const getFilteredKeys = (obj)=>{
       var result = {}
      Object.keys(obj).forEach(key => {
        if(filter(key,obj[key])){
          result[key] = obj[key]
        }
      });
      return result;
    }
    const recurse = (obj, depth = 0,isDocJsonNode=false,parent=null) => {
      var result = {};
   
      for(const key in obj) { 
        if(obj[key]['@']) isDocJsonNode = true;
        if(obj.hasOwnProperty(key)) { 
      
             if(obj[key]['@']){
            var node = obj[key]['@']; 
            const children = Object.fromEntries(Object.entries(obj[key]).filter(([key]) => key !== '@'));
        
            const filteredKeys =getFilteredKeys(obj[key]['@']);
  
           if(Object.keys(children).length==0){ 
            // filtered keys here 
         
            
              // apply filter here 
             result[key]= {['@']:filteredKeys}
          
           }else{ 
  
             result[key]= {['@']:filteredKeys,...recurse(children, depth + 1,isDocJsonNode,node)} 
           }
          }else{ 
             
            result[key] = obj[key];
        
          }
        }
      }
    return result;
    } 
    return recurse(obj);
    }   
  // default options
         options = deepMerge({
           
          mapKeys:['name','filePath','route'],  
          model:parseJSJSON,
          modelOptions:{  },
          
        }, options);

    const {model,modelOptions,mapKeys}=options;
  
    const {targetPath,docPath}= pluginOptions;
    // generate output path
    var nodedocsPath = docPath + filePath.substring(targetPath.length);
    if(isDirectory){
 
    }else{ 
    // set output path extension  *.turbodoc.json instead of .*, in this case instead of.js
   const  nodeOutputFilePath =  nodedocsPath.slice(0, nodedocsPath.lastIndexOf('.'));
     const globalFileTreePath =nodeOutputFilePath
        .substring(docPath.length)
        .replace(/\./,'')
        .split('\\')
        .filter(e => e !== "");
    // read js file 
    const fileContents = fs.readFileSync(filePath, 'utf-8');
   // pass extra data (filePath,...) and update route    to all elements 

    var elementUri = 'aaaa'

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
    var  parsedContents= model(fileContents,modelOptions);

 
    
 
 
  // @todo make object/filterkeys from here  



  // // uri to non jsdoc node nodes 
  // Object.keys(parsedContents).forEach(key => {
  //   parsedContents.uri= globalFileTreePath.join('/')+`.html`;
  // });
 

  var parsedMapContents =filterJsDocKeys(parsedContents,mapKeys); 
      oset(data.globals,['parsedMap',...globalFileTreePath],parsedMapContents)
 


 



    // store cycle data for the nexxt operation 
    data.cycle = {
        ...data.cycle,
        // not necessary
    };
    return {
        'operation':'makeMap', 
        result: {success:true,output:nodeOutputFilePath}
    }
    }
  }
module.exports=makeMap;  