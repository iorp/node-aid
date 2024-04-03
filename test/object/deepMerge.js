
 
const deepMerge=require('../../src/object/deepMerge');
var a= {
    a:0,
    b:{
        c:1,
       
    },
    h:[2,3]
}

var b= {
    d:2,
    e:{
        f:()=>{console.log(1)}
    },
     h:[()=>{},23]
   
}

// var b= {
   
//     j:()=>{var a=1;},
//     i:class{}
   
// }


console.log( deepMerge(a,b) ); 