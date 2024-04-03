const promptForConfirm= require('../terminal/promptForConfirm');
 
const fs = require('fs');
const path = require('path'); 
const rimraf = require('rimraf');
const { exec } = require('child_process');  


/**
 * Asynchronously removes a file or directory.
 *
 * @param {string} uri - The URI of the file or directory to be removed.
 * @param {Object} options - Options for the removal operation.
 * @param {boolean} options.confirm - If true, prompts for confirmation before deletion. Defaults to false.
 * @param {boolean} options.verbose - If true, logs detailed information about the deletion process. Defaults to false.
 * @returns {Object} - An object with information about the deletion operation.
 * @throws {Object} - An object with error information if an exception occurs during the removal.
 */ 
const remove = async (uri, options = {}) => { 
    var {confirm=false,verbose=false}= options;
    
    const answer = await promptForConfirm(`Do you want to delete ${uri}`, ['y', 'n'], confirm);

    if (answer === 'n') {
        if (verbose) console.log(`Path ${uri} has NOT been deleted.`);
        return { 'code': 'DontOverwrite', 'error': false ,answer:answer};
    }

    try {
        if (uri.startsWith('file://')) uri = uri.replace('file://', '').trimStart('/');

        const onRmError = (func, path, excInfo) => {
            fs.promises.chmod(path, '0o755').then(() => fs.promises.unlink(path));
        };

        if (await fs.promises.access(uri).then(() => true).catch(() => false)) {
            if ((await fs.promises.stat(uri)).isDirectory()) {
                let itemsDeleted = 0;
                let bytesDeleted = 0;
                let totalBytes = 0;

                const processFile = async (itemPath, fileSize) => {
                    totalBytes += fileSize;
                    bytesDeleted += fileSize;
                    await fs.promises.unlink(itemPath);
                    itemsDeleted++;

                    if (verbose) {
                        const progress = (bytesDeleted / Math.max(totalBytes, 1)) * 100;
                        process.stdout.write(`Deleted: ${bytesDeleted} bytes / ${totalBytes} bytes (${progress.toFixed(2)}%)`);
                        process.stdout.write('\r');
                        
                    }
                };

                const processDirectory = async (dirPath) => {
                    const items = await fs.promises.readdir(dirPath);
                    for (const item of items) {
                        const itemPath = path.join(dirPath, item);

                        if ((await fs.promises.stat(itemPath)).isDirectory()) {
                            await exec(`attrib -H "${itemPath}"`);
                            await processDirectory(itemPath);
                            itemsDeleted++;
                        } else {
                            await processFile(itemPath, (await fs.promises.stat(itemPath)).size);
                        }
                    }
                };

                await processDirectory(uri);
                //fs.promises.rm(pathToDelete, { recursive: true }).catch(onRmError);
                //await fs.promises.rmdir(pathToDelete, { recursive: true }).catch(onRmError);
        
                rimraf.sync(uri, { onerror: onRmError });
            } else {
                const fileBytes = (await fs.promises.stat(uri)).size;
                await fs.promises.unlink(uri).catch(onRmError);

                if (verbose) {
                    const progress = 100.0;
                    process.stdout.write(`Deleted: ${fileBytes} bytes / ${fileBytes} bytes (${progress.toFixed(2)}%)`);
                    process.stdout.write('\r');
                    
                }
            }
        } else {
            return { 'error': true, 'code': 'RemovePathNotFound', 'exception': `File not found: ${uri}` };
        }
 
        if (verbose) console.log(`Path ${uri} has been deleted.`);
        return { 'code': 'FileSystemRemove', 'answer': answer };
    } catch (e) {
        return { 'error': true, 'code': 'RemoveException', 'exception': e.toString() };
    }
};

module.exports = remove;