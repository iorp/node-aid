

 // Grouped Attributes Nested Object to Grouped Children Nested Array 

 function ganoToGcna(obj) {
    const recurse = (obj, depth = 0,isDocJsonNode=false,parent=null,ancestors=[]) => {
      var result = [];
      
  
      for(const key in obj) { 
        if(obj[key]['@']) isDocJsonNode = true;
        if(obj.hasOwnProperty(key)) {  
             if(obj[key]['@']){
            var node = obj[key]['@']; 
            node['@ancestors'] = ancestors; 
            const children = Object.fromEntries(Object.entries(obj[key]).filter(([key]) => key !== '@'));
        
           if(Object.keys(children).length==0){
            node['@ancestors'] = ancestors;  
            result.push(node); 
           }else{
            
            node.children =recurse(children, depth + 1,isDocJsonNode,node,[...ancestors,node.name]); 
            result.push(node); 
           }
          }else{
            if(!isDocJsonNode){
                //  also converts other stuff that is not a jsondoc node
                // objects
                if(typeof obj[key] === 'object' && obj[key] !== null) {

                  var node = {name:key};
                  node['@ancestors']= ancestors;  
                  node.children=recurse(obj[key],depth,isDocJsonNode,obj[key],[...ancestors,key])
                 result.push(node)
                }else{
                  // put as keys
                  if(parent)  parent[key] = obj[key];
                  //put as child
                  //result.push(obj)
 
                }
            }
              
        
          }
        }
      }
    return result;
    } 
    return recurse(obj);
    }
     

module.exports = ganoToGcna;

    /// chatgpt remove from here and use the below content to make a docblock
//     const data ={
//         a:{ '@':{  name:'a' },
//         aa:{'@':{  name:'aa'  } 
//         },
       
//         },
//         b:{ '@':{  name:'b'  }},
//     } 
// console.log(ganoToGcna(data))
 