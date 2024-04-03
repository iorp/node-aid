// const odel = require('./../../../../src/object/odel')
const ofil = require('./../../../../src/object/ofil')
const normalizeParsedNode = (node)=>{
     
 const mergeUniqueTypeTags=(arrayA,arrayB) =>{
 
   return arrayB.map(itemB => {
     const existingItemA = arrayA.find(itemA => itemA.type === itemB.type);
   
     if (existingItemA) {
       // If 'type' exists in arrayA, overwrite the item
       return { ...existingItemA, ...itemB };
     } else {
       // If 'type' doesn't exist in arrayA, push the item
       return itemB;
     }
   });
  }

  const transformRecurrentType=(type,tags=[])=>{
    var listed=[];
     tags.forEach(tag => { 
       if(tag.type ==type){
        listed.push(tag.content);
       }
       
      });
      return listed;
 
  }
  const getExtractedParams=(node)=>{
    return (node.params||[]).map(item => {
      const [name, defaultValue] = item.split('=');
      const obj =   { 
        category:'a',
        type: "@param",
        dataType: "{unknown}",
        name: name.trim(),
        default: defaultValue!=undefined ? defaultValue.trim() :"unimplemented",
        attributes: {
          optional: defaultValue!=undefined ? true :false
        },
        comment: ""
       }; 
      
      return obj;
  });
  }
 
  const getExtractedTags=(node)=>{
  // automatically extracted tags
  var extractedTags= [] 
  extractedTags.push( {  category:'c' ,type: "@name",  value: node.name});
  if(node.async) extractedTags.push(  {  category:'b' ,  type: "@async" ,value:true})
  if(node.static) extractedTags.push(  {  category:'b' , type: "@static",value:true})
 if(node.extends) extractedTags.push(  {  category:'c' , type: "@extends",value:node.extends})
 return extractedTags;
  }
   // automatically extracted tags
    var extractedTags= getExtractedTags(node); 
 
   const extractedParams =getExtractedParams(node);

  
    var tags,examples;
    var description = 'A '+node.type +' named "'+node.name+'.';
    if(node.block && node.block.data){
   // join tags 
   description = node.block.data.description;
   // merge tags giving priority to docblock 
   tags =mergeUniqueTypeTags(extractedTags,node.block.data.tags);
   examples =transformRecurrentType('@example',node.block.data.tags);
    }else{
   examples=[];
     tags = [...extractedTags,...extractedParams]
    }
    
   const transformed={
     examples,
     params:[]
   }
     tags.forEach(tag => {
    
     const type = tag.type.substring(1);
     if(type=='param'){
    transformed.params.push( ofil(tag,['category','type']));
     //   transformed.params.push( tag);
    }else if (tag.category=='b'){ 
       transformed[type]= true;
    } else if (tag.category=='c'){
     transformed[type]= tag.value;
     }else  if (tag.category=='e'){
       transformed[type]= tag.content;
       }else {
       transformed[type]=   ofil(tag,['category','type']);
       // transformed[type]=  tag;
      } 
    });
   var normalized = {  
    ...ofil(node,['block']),
// ...node,
    
     ...ofil(transformed,['example','parent']),
     description
   };

   normalized.attributes=[];
   if(normalized.async) normalized.attributes.push('async');
   if(normalized.static) normalized.attributes.push('static');
   
    return normalized;
 
  };
 
  module.exports=normalizeParsedNode;