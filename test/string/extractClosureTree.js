
const extractClosureTree=require('../../src/string/extractClosureTree');




// Example usage:
var inputString = "{ example { nested } closures }";
const resultTree = extractClosureTree(inputString);

console.log(resultTree);


// example using a custom collector
var inputString=`{a{b}{c}}`
const customCollector= function(collected,closure,options,globalOffset,globalDepth){
    collected[Object.keys(collected).length]={
        '@match':closure.match,
        '@matchInner':closure.matchInner,
        '@start':closure.start ,
        '@end':closure.end + globalOffset,  
        '@depth':globalDepth,  
        children:extractClosureTree(closure.match.slice(1, -1),{...options,offset:0},globalOffset+closure.start+options.opener.length,globalDepth+1)
        // the children can be grouped in a key
        // children:extractClosureTree(closure.match.slice(1, -1),{...options,offset:0},globalOffset+closure.start+options.opener.length)//+1 because we have sliced the closure symbol recurse(closure.match.slice(1, -1),level+1)
        // the children can be spread
        //...extractClosureTree(closure.match.slice(1, -1),{...options,offset:0},globalOffset+closure.start+options.opener.length,globalDepth+1)//+1 because we have sliced the closure symbol recurse(closure.match.slice(1, -1),level+1)
   
    };
}
var tree = extractClosureTree(inputString,{collector:customCollector})
console.log(JSON.stringify(tree,null,2));

 