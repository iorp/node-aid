    // Arrray get index safely fringto arrays
    const ageti=(arr,index,defaultValue)=>{
        if(!arr || !Array.isArray(arr))  return defaultValue; 
       return arr.length>index? arr[index]:defaultValue;
      }
      module.exports=ageti;