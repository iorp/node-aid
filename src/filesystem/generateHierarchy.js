 
  
const fs = require('fs');
const path = require('path');  

const directoryExists= require('../filesystem/directoryExists');
const remove= require('../filesystem/remove');
const deepClone = require('../object/deepClone');

/**
 * Asynchronously generates a directory hierarchy with files and subdirectories.
 *
 * @param {string} base - The base path where the hierarchy will be created.
 * @param {Object|Array} items - The items to be created in the hierarchy. Can be a single item or an array of items.
 * @param {Object} options - Options for the hierarchy generation.
 * @param {boolean|null} options.overwrite - If true, overwrites existing directory. If null, prompts for confirmation. Defaults to null.
 * @param {boolean} options.verbose - If true, logs detailed information about the generation process. Defaults to false.
 * @param {boolean} options.merge - If true, disables the overwrite system and merges the content if existing , always overwrites existing files
 * @returns {Object} - An object indicating the success of the hierarchy creation.
 * @throws {Object} - An object with error information if an exception occurs during hierarchy creation.
 */
async function generateHierarchy(base, items, options={}) { 
    options = Object.assign({
         overwrite:null,
         verbose:false,
         merge:false,
          },options);
    
      const {    verbose,overwrite ,merge  } = options; 
    async function createItems(currentPath, items) {
        for (const item of items) {
            if(!item)continue;
           //  if(!item.name)  continue;
            if(!item.name){
              //  continue;
                console.error('[generateHierarchy] Item must have a name attribute,check provided items.',item)
                process.exit(1);
            }
          
             const itemPath = path.join(currentPath, item.name);

            if (item.type === 'file') {
                const itemContent  = typeof item.content==="string"? item.content : JSON.stringify(item.content,null,2 )
              //  item.content =  typeof item.content==="string"? item.content : JSON.stringify(item.content,null,2 )
            
                await fs.promises.writeFile(itemPath, itemContent, { encoding: item.encoding || 'utf-8' });
                if (verbose) console.log(`File '${itemPath}' created.`);
            } else if (item.type === 'dir') {
                if(!directoryExists(itemPath)) await fs.promises.mkdir(itemPath);
                if (verbose) console.log(`Directory '${itemPath}' created.`);
                if (item.children) {
                    await createItems(itemPath, item.children);
                }
            }else{
                console.error('Item type must be a "dir" or "file".',item)
                process.exit(1);
            }
        }
    } 
    //try {
          
        if(directoryExists(base) ) {
           
          r=  await remove(base,{confirm:merge?false:overwrite,verbose:verbose}); 
          if(r.error )return r; 
          if(!merge &&  r.answer=='n'||r.answer==false) return {error:false,code:'NotOverwritten'} 
        }
    
        
        if(!directoryExists(base)) fs.mkdirSync(base, { recursive: true });  

        if (!Array.isArray(items)) items = [items];
            
        await createItems(base, items);
        if (verbose) console.log('Files and folders created successfully.');
        return { success: true, items: items };
    // } catch (error) {
    //     error = { error: true, code: 'CreateHierarchyError', exception: error.message };
    //     return error;
    // }
}
module.exports = generateHierarchy;





/*
Great test
(async ()=>{
  const hierarchyArray = hierarchyAsArray(input,{
    fileNodeModel:(uri, name) => { return {  name , uri, content:'content here...' }; }, // fs.readFileSync(uri, 'utf-8')
    dirNodeModel:(uri, name) => { return { uri, name }; },
    fileFilter :(filePath) => true,
    dirFilter : (dirPath) => true, 
  });
  //console.log(JSON.stringify(hierarchyArray,null,2));
  
  if(!hierarchyArray) return {error:true,code:'errorcode',exception:'hierarchyArray couldn not be created'}
  
  const generationResponse =  await generateHierarchy(output, hierarchyArray,{verbose:true,overwrite:null});
  
  console.log('generated',generationResponse);
  
  })()
*/  