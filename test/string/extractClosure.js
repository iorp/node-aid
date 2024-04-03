
 const extractClosure=require('../../src/string/extractClosure');


 
console.log(0,'Simple',extractClosure('{a:{}}'))
console.log(1,'Closure dquote',extractClosure('{a:"}"}'));
console.log(2,'Closure squote',extractClosure("{a:'}'}"));
console.log(3,'Closure oquote',extractClosure('{a:`}`}'));
console.log(4,'Closure slcomment',extractClosure(`{\na:1, // this is commented ->} \n}`));
console.log(5,'Closure mlcomment',extractClosure(`{ \n a:1, \n/* this is commented ->}*/ \n }`));
console.log(6,'Closure error',extractClosure('{a:11'));
console.log(7,'Closure offset ',extractClosure('{a:1} {b:2}',{opener:'{',closer:'}',offset:5}));  
console.log(8,'Closure of quotes',extractClosure('a"b"',{opener:'"',closer:'"',offset:0,inclusive:true,excludes:[]}));
console.log(9,'Closure non inclusive',extractClosure('a"b"',{opener:'"',closer:'"',offset:0,excludes:[]}).matchInner);