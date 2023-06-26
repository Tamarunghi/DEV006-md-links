// ---NODE.js Import--- \\
const fs = require("fs"); 

// ---functions Import--- \\
const {pathExist,              validatePathAbsolute,
      validatePathDirectory,    toAbsolutePath,
      recursive,                validateFile,
      readMdFile,               extractLinks,
      verifyLinks,              isFile,
      } = require("./functions")


/* Función mdLinks: en donde path es la ruta alarchivo o direnctorio y 
option determina si se validan los links encontrados o no */
const mdLinks = ( path, option = {validate:false} ) => { 
/* al agregar "={}" a un parámetro en la definición de una función,
lo que esta dentro de los {} se establece por defecto */
  return new Promise ((resolve, reject)=>{
    if(!pathExist(path)){
      reject(new Error("The path dosen't exist"));
      console.log(reject)
      return;
    }
    const files = recursive(path);
    const mdFiles = files.filter(validateFile)
       const links = [];

       const promises = mdFiles.map((file) => {
        return readMdFile(file)
          .then((fileContent) => {
            const extractedLinks = extractLinks(fileContent, file);
            links.push(...extractedLinks);
            /* los 3 puntitos se conocen como 
      Operador de propagación (Spread operator) y sirven para que todo se
      junte en un array y no varios */
            return Promise.resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });

      Promise.all(promises)
      .then(() => {
        if (!option.validate) {
          resolve(links);
        } else {
          resolve(verifyLinks(links));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
    
mdLinks("./linkTests/links.md", {validate:true})
  .then((resolvedPath) => {
  console.log(resolvedPath);
  })
  .catch((error) => {
  console.error(error.message);
});

 /* Promise.all es un metodo que combina múltiples promesas en una sola 
      promesa que se resuelve cuando todas las promesas están resueltas. */  
  
      module.exports = {
       mdLinks,
    };
  