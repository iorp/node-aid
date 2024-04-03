 
 
 todo
 const path = require('path');
 
const generateHierarchy=require('../../../../src/filesystem/generateHierarchy');
const writeFile=require('../../../../src/filesystem/writeFile');
const Founder=require('../../../src/plugin/turbodoc/Founder');
const JsParser=require('../../../../src/plugin/turbodoc/parsers/JsParser');


    

const tempPath =path.join('./test/.temp/Founder');  
 (async ()=>{
  var r;
 
    r=   await generateHierarchy(tempPath, [
        { type: 'file', name: 'file0.js', content: `
        //@doc This is file0 explanation continue here!
        /**
         *   docblock method0
         **/   
        function method0(x,y,z){ 
          //@todo bla bla 
        }
        /**
         *   docblock method1
         **/  
        function method1(x,y,z){ 
        }

        ` },
        { type: 'file', name: 'file1.js', content: `
        /**
         *   docblock method0
         **/  
        function method0(x,y,z){ 
        }
        /**
         *   docblock method1
         **/  
        function method1(x,y,z){ 
        }

        ` },
        { type: 'dir', name: 'dir0', children: [
          { type: 'file', name: 'file0.js', content: `
          /**
           *   docblock method0
           **/  
          function method0(x,y,z){ 
          }
          /**
           *   docblock method1
           **/  
          function method1(x,y,z){ 
          }
  
          ` },
        ]},

        , 
    ],{verbose:false,overwrite:'y'});
   


    
    if(r.error){
      console.log(r)
      process.exit(1)
    }
 





    /// test start 
 

  
     ///fromTemplate
      // r =  Founder.fromTemplate({
      //   output:'./README2.md',
      //   template:'./docs/README.template.md', 
      //   merge:false,
      //   variables:{
      //     intro: "123"
      //      ...
      //   }
      //   })

///generateDocs
r = await Founder.generateDocs({
  input:tempPath,
  output:path.join(tempPath,'.docs')
});



      console.log(r);
  })();
 
  
  





 