import  FSON  from './../plugin/fson';
  
const readArgs=()=>{ 
    let args = {}
     if(window.location.search && window.location.search.startsWith('?') && window.location.search.length>1){
     
      args = FSON.parse(`(${window.location.search.trim().substring(1)})`)
    
     }
     return args
    }
    
 
module.exports = readArgs;