
const otog=require('../../src/object/otog');

const obj= {
    a:false,
    b:{
        c:false,
        d:0,
        e:''

    }
}

 otog(obj,'a')
 otog(obj,'b.c')
 otog(obj,'b.d')
 otog(obj,'b.e')

console.log(obj)