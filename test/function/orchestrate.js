 
 
 
 const orchestrate=require('../../src/function/orchestrate'); 

function methodA(options){
  console.log('member a')
return {
  methodName:'a',
  value:123,
  options
}
}

function methodB(options){
  console.log('member b')
return {
  methodName:'b',
  value:123,
  options
}
}
(async ()=>{ 

/// demo !
r =  await orchestrate({ 
 methods:[
    // example 
    // run withHierarchy action that puts  a prefix to the file, and 
    [methodA,{greet:'hello'}] ,
    [methodB,{greet:'what is up?!'}] ,
     
 ]
})


console.log(r)

})();