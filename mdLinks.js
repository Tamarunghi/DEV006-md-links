// ---NODE.js Import--- \\
const fs = require("fs"); 

// ---functions Import--- \\
const {pathExists,  validatePath, 
  AbsolutePath, findPath} = require("./functions")

// const optionValidation = require ("./option.js");
// optionValidation();

/* Función mdLinks: en donde path es la ruta alarchivo o direnctorio y 
option determina si se validan los links encontrados o no */
const mdLinks = ( path /*, option = {validate:false}*/ ) => { 
/* al agregar "={}" a un parámetro en la definición de una función,
lo que esta dentro de los {} se establece por defecto */
    return new Promise ((resolve, reject)=>{
        if (fs.existsSync(path) ){
 /* "fs.existsSync()" verificar si existe un archivo o directorio
  en la ubicación especificada en el prentesis */
        resolve (path); 
        return;
    }else{
        reject(new Error("The specified path does not exist"))
        /* "Error()" es el constructor incorporado en JavaScript para
        crear objetos de error, "new Error()" cre una nueva instancia de
        un objeto de error con un mensaje específico que describe el error*/
    }
    });
};

mdLinks("./linkTests/links.md")
  .then((resolvedPath) => {
    console.log(resolvedPath);
  })
  .catch((error) => {
    console.error(error.message);
  });