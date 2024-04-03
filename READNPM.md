If you have a library published on npm (Node Package Manager) and you want to update it with changes you've made, you can follow these steps:

1. **Make Changes:**
   First, make the necessary changes to your library code.

2. **Update Version Number:**
   Update the version number in your `package.json` file. You should follow semantic versioning (SemVer) conventions, which typically consist of three numbers separated by dots: `MAJOR.MINOR.PATCH`. Update the version based on the nature of your changes:
   - If you make backward-incompatible API changes, increment the MAJOR version.
   - If you add functionality in a backward-compatible manner, increment the MINOR version.
   - If you make backward-compatible bug fixes, increment the PATCH version.

   Example:
   ```json
   {
     "name": "your-library",
     "version": "1.0.1",
     // ...
   }
   ```

3. **Commit Changes:**
   Commit your changes to version control (e.g., Git). You can use commands like:
   ```bash
   git add .
   git commit -m "Version 1.0.1: Description of changes"
   ```

4. **Publish to npm:**
   Run the following command to publish your updated package to the npm registry:
   ```bash
   npm publish
   ```

   If you're publishing a new major version, you might need to use the `--major` flag:
   ```bash
   npm version major
   npm publish
   ```

   This command will package your library, upload it to the npm registry, and make it available for others to install.

5. **Verify on npm:**
   Visit your package page on the npm website to verify that the new version has been published: https://www.npmjs.com/package/your-library

Keep in mind that you need to have the appropriate permissions to publish a new version of a package. If it's your own package, you should have the necessary permissions. If it's a shared package, make sure you coordinate with other maintainers.