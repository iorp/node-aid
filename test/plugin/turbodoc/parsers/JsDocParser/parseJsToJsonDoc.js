  
 
// const JsScrapper=require('../../../../../src/plugin/turbodoc/parsers/JsScrapper');
const parseJSJSON=require('../../../../../src/plugin/turbodoc/parsers/JsDocParser/parseJSJSON');
// use as: node test/plugin/turbodoc/parser/JsParser.js 0
 

const tests = [
  
    {
      title:'Tester',
      str:`  
       function a (){

       }
      `
    },
    {  title:'All',
      str:` 
    // definitions 
     class A{}
     static class B{}
     function C(){}
     static function D(){}
     async function E(){}
     static async function F(){}
     Function.prototype.G = function(args) { }
     Array.prototype.H = function(args) { }
     class I {
      a(){}
      static b(){}
      async c(){}
      static async d(){}
    
    }
    class J{ 
      a = ()=>{}
      b =async ()=>{}
      static c =  ()=>{}
      static d = async ()=>{}
    }
  
  
    class L{ 
      a = class{  }
      static b = class{  }
   }
   class M extends myBaseClass{}
   static class N extends myBaseClass{}
   const O = class extends myBaseClass{}
  
  
  class P { 
    a = class extends myBaseClass{}
    static b = class extends myBaseClass{} 
  }
  
  
    // assignations
     var a; 
     const b=1;
     let c="2";
     var d='3'+
     '3';
     var e = class{}
     var f = static class{}
     var g = static class extends () {}
     var h = class extends () {}
     var i = function(){}
     var j = async function(){}
     var k = static function(){}
     var l = async static function(){}
     var m = ()=>{}
     var n = async ()=>{}
     var o = static ()=>{}
     var p = async static ()=>{}
      `
    }, 
  ]; 

   let testIndex = process.argv[2]||0;
  
   var test = tests[testIndex];
   console.log('TESTING:',testIndex, test.title); 

 
   r= parseJSJSON((test.str||""), {
    debug:true,
    markers:{
    'todo':'@todo',
    'doc':'@doc'
  }})
   
  r = JSON.stringify(r,null,2)
  console.log(r);
     