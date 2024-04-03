const deepMerge = require('../../../../../object/deepMerge');
const ganoToGcna = require('../../../tools/ganoToGcna')

function Treeview(data,root,options) { 
   options =  deepMerge({
    expanded:true,
    locked:false,
    docsRelPath:'doc/'
   },options);
   const {docsRelPath,expanded}=options;
    const recurse = (elements,depth = 0,parent=null) => { 
    var result = '';
    for (const element of elements) {

    
     const link = element.uri ? `href="${root}${docsRelPath}${element.uri}"`:'';
      if(element.children && element.children.length>0){

        result+=` <a ${link} class="list-group-item ${expanded?'in':''}" data-toggle="collapse" style="padding-left:${(depth*10)}px">
           
            ${element.name}   <span class="chevron"></span>
              </a>
          <div class="list-group collapse ${expanded?'show':''}"  >`;
              result+=recurse(element.children, depth + 1, element);
        
          result+=`</div>`;
  
      }else{
        result+=`  <a ${link} class="list-group-item">${element.name}    </a>`;
      
  
      }
    }
      return result;
  }
  
   
  
  var html = `<div  class="tbd-treeview list-group list-group-tree">`;
  html+= recurse(ganoToGcna(data));
  html+=`</div>`;
  
  
   
   
  return html;
      }
module.exports = Treeview;  