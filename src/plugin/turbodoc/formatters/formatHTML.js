 
const normalizeParsedNode =require ('../tools/normalizeParsedNode');
const ganoToGcna =require ('../tools/ganoToGcna');
const odel = require("../../../../src/object/odel");
const deepClone = require("../../../../src/object/deepClone");

const formatHTML = (nodes,modelOptions) => {

    //  const children =  odel(deepClone(node),'@')
     
    const nodeModel=(node)=>{
        return `
                <div id="${node.name}" class="">
                      <h2>${node.name}</h2>
                      <p class="lead">${node.description}</p>
                      <dl class="row">
                          <dt class="col-sm-3 col-md-2">Line:</dt>
                          <dd class="col-sm-9 col-md-10">${node.line}</dd>
                          <dt class="col-sm-3 col-md-2">Level:</dt>
                          <dd class="col-sm-9 col-md-10">${node.level}</dd>
                          <dt class="col-sm-3 col-md-2">Type:</dt>
                          <dd class="col-sm-9 col-md-10">${node.type}</dd>
                          <dt class="col-sm-3 col-md-2">Datatype:</dt>
                          <dd class="col-sm-9 col-md-10">${node.datatype}</dd>
                          <dt class="col-sm-3 col-md-2">Start:</dt>
                          <dd class="col-sm-9 col-md-10">${node.start}</dd>
                          <dt class="col-sm-3 col-md-2">End:</dt>
                          <dd class="col-sm-9 col-md-10">${node.end}</dd>
                          <dt class="col-sm-3 col-md-2">Location:</dt>
                          <dd class="col-sm-9 col-md-10">${node.location}</dd>
                          <dt class="col-sm-3 col-md-2">Uri:</dt> 
                          <dd class="col-sm-9 col-md-10">${node.uri}</dd>
                          <dt class="col-sm-3 col-md-2">Route:</dt> 
                          <dd class="col-sm-9 col-md-10">${node.route.join('.')}</dd>
                      </dl>
                  </div>
          
                  ${node.params && node.params.length > 0 ? `
                      <div class="">
                          <h3>Parameters</h3>
                          <div class="table-responsive">
                              <table class="table">
                                  <thead>
                                      <tr>
                                          <th>Name</th>
                                          <th>Datatype</th>
                                          <th class="text-left">Default</th>
                                          <th>Description</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      ${node.params.map(param => `
                                          <tr>
                                              <td>${param.name}</td>
                                              <td>${param.dataType}</td>
                                              <td class="text-left">${param.default !== 'unimplemented' ? param.default : 'N/A'}</td>
                                              <td>${param.comment}</td>
                                          </tr>
                                      `).join('')}
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  ` : ''}
          
                  ${node.returns ? `
                      <div class="container mt-4">
                          <h3>Returns</h3>
                          <p>${node.returns.dataType} ${node.returns.comment}</p>
                      </div>
                  ` : ''}
          
                  ${node.throws ? `
                      <div class="container mt-4">
                          <h3>Throws</h3>
                          <p>${node.throws.dataType} ${node.throws.comment}</p>
                      </div>
                  ` : ''}
          
                  ${node.examples && node.examples.length > 0 ? `
                      <div class="container mt-4">
                          <h3>Examples</h3>
                          <ul class="list-group">
                              ${node.examples.map(example => `<li class="list-group-item">${example}</li>`).join('')}
                          </ul>
                      </div>
                  ` : ''}
              `;
    }
 
     const recurse = (nodes) => { 
      var result = '';

      for (var key of Object.keys(nodes)) {
        var node = nodes[key];
      if(node['@']){
        const children =  odel(deepClone(node),'@')
        node = normalizeParsedNode(node['@']);
   
        result+=`<div>${nodeModel(node)}


        ${(Object.keys(children).length>0)?recurse(children):''}
            </div>`; 

        

      }
    }
    return result;
    //   for (const element of node) {
    //     if(element.children && element.children.length>0){
    //       result+=` <div> 
    //           ${element.name} 
    //             </div>
    //         <div class="">`;
    //             result+=recurse(element.children, depth + 1, element);
          
    //         result+=`</div>`;
    
    //     }else{
    //       result+=`  <a class="">${element.name}</a>`;
        
    
    //     }
    //   }
      
    }
    
    
    
    
    var html = ``;
    html+= recurse(nodes);
    html+=``;
    
    
    
     
    return html;
   
     
  //   node = normalizeParsedNode(node);   
    // console.log(node)
    // process.exit(1)
  

//    function generateDocumentation(data) {
//       // <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
//       // <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
//      // todo continue here 
//       return `
//         <div class="">
//               <h2>${data.name}</h2>
//               <p class="lead">${data.description}</p>
//               <dl class="row">
//                   <dt class="col-sm-3 col-md-2">Line:</dt>
//                   <dd class="col-sm-9 col-md-10">${data.line}</dd>
//                   <dt class="col-sm-3 col-md-2">Level:</dt>
//                   <dd class="col-sm-9 col-md-10">${data.level}</dd>
//                   <dt class="col-sm-3 col-md-2">Type:</dt>
//                   <dd class="col-sm-9 col-md-10">${data.type}</dd>
//                   <dt class="col-sm-3 col-md-2">Datatype:</dt>
//                   <dd class="col-sm-9 col-md-10">${data.datatype}</dd>
//                   <dt class="col-sm-3 col-md-2">Start:</dt>
//                   <dd class="col-sm-9 col-md-10">${data.start}</dd>
//                   <dt class="col-sm-3 col-md-2">End:</dt>
//                   <dd class="col-sm-9 col-md-10">${data.end}</dd>
//                   <dt class="col-sm-3 col-md-2">Location:</dt>
//                   <dd class="col-sm-9 col-md-10">${data.location}</dd>
//               </dl>
//           </div>
  
//           ${data.params && data.params.length > 0 ? `
//               <div class="">
//                   <h3>Parameters</h3>
//                   <div class="table-responsive">
//                       <table class="table">
//                           <thead>
//                               <tr>
//                                   <th>Name</th>
//                                   <th>Datatype</th>
//                                   <th class="text-left">Default</th>
//                                   <th>Description</th>
//                               </tr>
//                           </thead>
//                           <tbody>
//                               ${data.params.map(param => `
//                                   <tr>
//                                       <td>${param.name}</td>
//                                       <td>${param.dataType}</td>
//                                       <td class="text-left">${param.default !== 'unimplemented' ? param.default : 'N/A'}</td>
//                                       <td>${param.comment}</td>
//                                   </tr>
//                               `).join('')}
//                           </tbody>
//                       </table>
//                   </div>
//               </div>
//           ` : ''}
  
//           ${data.returns ? `
//               <div class="container mt-4">
//                   <h3>Returns</h3>
//                   <p>${data.returns.dataType} ${data.returns.comment}</p>
//               </div>
//           ` : ''}
  
//           ${data.throws ? `
//               <div class="container mt-4">
//                   <h3>Throws</h3>
//                   <p>${data.throws.dataType} ${data.throws.comment}</p>
//               </div>
//           ` : ''}
  
//           ${data.examples && data.examples.length > 0 ? `
//               <div class="container mt-4">
//                   <h3>Examples</h3>
//                   <ul class="list-group">
//                       ${data.examples.map(example => `<li class="list-group-item">${example}</li>`).join('')}
//                   </ul>
//               </div>
//           ` : ''}
//       `;
//   }
  
  

//   let html =    `<div style="border: 1px solid black;">`;
 
//   html+=generateDocumentation(node);
//    html+=`
//     <div><pre>${JSON.stringify(node,null,2)}</pre> </div>
//      `;
// // Recursively render children (siblings of '@' node)
// if (children) {
//     const childrenHTML = recurse(children,options, node.level + 1);
//     html += childrenHTML;
//   } 
//   html += `</div>
  
//   `; 
  
//   return html;
   // return ` <pre>${JSON.stringify(node,null,2)}</pre>  `;
}
module.exports=formatHTML;
