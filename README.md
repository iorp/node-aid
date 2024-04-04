
#TODO: 
# kill turbodoc here and import it from npm 
# separate turbodev 
# kill turbodev here and import it from npm 
# src index.js accesses creator for on build, do it in turbodev
# readme file and
 
 

##   Build 
1. Build after edits.
Script postbuild will perform a npm link , see postbuild scripts at [package](./package.json).
  ```bash
   npm run build
   ```
2. Eventually link.
  ```bash
   npm link
   ```

 
## Tests 

```bash
node test/array/aget.js 


 

```




npm publish --force