const fs = require('fs');
const path = require('path');
const pathExists = require('../filesystem/pathExists');
const directoryExists = require('../filesystem/directoryExists');
const remove= require('../filesystem/remove');

/**
 * Asynchronously copies files or directories from a source to a destination.
 *
 * @param {string} source - The source path of the file or directory to be copied.
 * @param {string|null} destination - The destination path where the file or directory will be copied.
 *                                    If null, a temporary directory is created, and the file is placed inside it.
 * @param {Object} options - Options for the copy operation.
 * @param {boolean} options.verbose - If true, logs detailed information about the copying process. Defaults to false.
 * @param {boolean|null} options.overwrite - If true, overwrites existing files or directories without prompting. If null, prompts for confirmation. Defaults to null.
 * @param {Function} options.fileFilter - Function to filter which files to copy. Defaults to a function that always returns true.
 * @param {Function} options.dirFilter - Function to filter which directories to copy. Defaults to a function that always returns true.
 * @returns {Object} - An object with information about the success of the copy operation.
 * @throws {Object} - An object with error information if an exception occurs during the copying process.
 */
async function copy(source, destination = null, options = {}) {
    var { merge=false, verbose = false, overwrite = null, fileFilter = () => true, dirFilter = () => true } = options;

    try {
        source = source.replace(/^file:[/]+/, '');
        destination = destination ? destination.replace(/^file:[/]+/, '') : destination;

        if (!pathExists(source) || !fileFilter(source)) {
            return { error: true, code: 'CopySourceMissing', exception: `Could not find or filter the source '${source}'` };
        }

        if (!destination) {
            const tempDir = await fs.promises.mkdtemp('temp-');
            destination = path.join(tempDir, path.basename(source));
        }

        if (pathExists(destination) && !merge) {
            const removeResult = await remove(destination, { confirm: overwrite, verbose: verbose });
            if (removeResult.error && removeResult.code !== 'RemovePathNotFound') return removeResult;
            if (removeResult.answer === 'n') return { code: 'DontOverWrite', path: destination, answer: 'n' };
        }

        if (!directoryExists(destination) && (destination.includes('/') || destination.includes('\\'))) {
            await fs.promises.mkdir(path.dirname(destination), { recursive: true });
        }

        if ((await fs.promises.stat(source)).isDirectory() && dirFilter(source)) {
            await fs.promises.mkdir(destination, { recursive: true });

            let totalSize = 0;
            let copiedSize = 0;

            const calculateTotalSize = async (dirPath) => {
                const items = await fs.promises.readdir(dirPath);
                for (const item of items) {
                    const itemPath = path.join(dirPath, item);
                    const stats = await fs.promises.stat(itemPath);
                    if (stats.isDirectory()) {
                        await calculateTotalSize(itemPath);
                    } else {
                        totalSize += stats.size;
                    }
                }
            };

            await calculateTotalSize(source);

            const copyFiles = async (srcDir, dstDir) => {
                const items = await fs.promises.readdir(srcDir);
                for (const item of items) {
                    const srcItemPath = path.join(srcDir, item);
                    const dstItemPath = path.join(dstDir, item);
                    const stats = await fs.promises.stat(srcItemPath);
                    if (stats.isDirectory() && dirFilter(srcItemPath)) {
                        await fs.promises.mkdir(dstItemPath, { recursive: true });
                        await copyFiles(srcItemPath, dstItemPath);
                    } else if (stats.isFile() && fileFilter(srcItemPath)) {
                        const content = await fs.promises.readFile(srcItemPath);
                        await fs.promises.writeFile(dstItemPath, content);
                        copiedSize += stats.size;
                        const progress = (copiedSize / (totalSize || 1)) * 100;
                        if (verbose) console.log(`Copied: ${copiedSize} bytes / ${totalSize} bytes (${progress.toFixed(2)}%)`);
                    }
                }
            };

            await copyFiles(source, destination);

            if (verbose) console.log();
            return { code: 'CopyDirSuccess', source: source, destination: destination, overwrite: overwrite };

        }

        if ((await fs.promises.stat(source)).isFile() && fileFilter(source)) {
            const content = await fs.promises.readFile(source);
            await fs.promises.writeFile(destination, content);

            return { code: 'CopyFileSuccess', source: source, destination: destination, extension: path.extname(destination), overwrite: overwrite };
        }

        return { error: true, code: 'CopySourceMissing', exception: `Could not find or filter the source '${source}'` };

    } catch (error) {
        return { error: true, code: 'CopyException', exception: error.message, source: source, destination: destination };
    }
}

module.exports = copy;
