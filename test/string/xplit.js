
 const xplit=require('../../src/string/xplit');


 
 console.log(0,'Simple',xplit('aaa - bbb','-'))
 console.log(0,'Simple',xplit('aaa - bbb {-}','-'))
 console.log(0,'Simple',xplit('aaa - bbb (-)','-'))
 console.log(0,'Simple',xplit('aaa - bbb [-]','-'))
 console.log(0,'Space',xplit('aaa bbb',' '))
// @note to escape a closure excluder apply double slash 
console.log(0,'escaping RIGHT',xplit("it isnt\\'t a cow",' '))
 console.log(0,'escaping WRONG ',xplit("it isnt\'t a cow",' '))
 