

const odel=require('../../src/object/odel');

var obj= {
    a:0,
    b:{
        c:1,
        d:{
            e:2
        },
        f:{
            g:3
        }
    }
}


 odel(obj,'a'); console.log(obj);
 odel(obj,'b.d.e');console.log(obj);  
 odel(obj,'b.f.g',true);console.log(obj);// remove parent if empty: true 
 