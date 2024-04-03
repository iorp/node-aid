
 
const oget=require('../../src/object/oget');

const obj= {
    a:0,
    b:{
        c:1
    }
}


console.log(oget(obj,'a'));
console.log(oget(obj,'b'));
console.log(oget(obj,'b.c'))