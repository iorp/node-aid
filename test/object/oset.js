
const oset=require('../../src/object/oset');

var obj= {
    a:0,
    b:{
        c:1
    }
}


 oset(obj,'a',123);console.log(obj);
 oset(obj,'b',{d:2},true);console.log(obj); // merge! 
 oset(obj,'b.c',456);console.log(obj);
 oset(obj,'b.e',789);console.log(obj);
 