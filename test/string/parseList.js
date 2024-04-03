
 
const parseList=require('../../src/string/parseList');

 // Test case 
 
let input,result 
input = 'a,"c,d"';result=parseList(input);console.log(0,'skip dquotes',input,result)
input = 'a,`c,d`';result=parseList(input);console.log(1,'skip backtick',input,result)
input = 'a,{c,d}';result=parseList(input);console.log(2,'skip brackets',input,result)
input = 'a,[c,d]';result=parseList(input);console.log(3,'TODO FIX skip sqbrackets',input,result)
input = 'a,(c,d)';result=parseList(input);console.log(4,'TODO FIX parens',input,result)
input = 'a__b__c';result=parseList(input,{separator:'__'});console.log(4,'Other separator',input,result)
input = 'a [b c]';result=parseList(input,{separator:' '});console.log(5,'other separator',input,result)
input = 'a (b c)';result=parseList(input,{separator:' '});console.log(6,'other separator skip bracket',input,result)
input = 'a {b c}';result=parseList(input,{separator:' '});console.log(7,'other separator skip bracket',input,result)




 