// ---Imports--- \\
const fs = require("fs");
const path = require("path");
const MarkdownIt = require("markdown-it");
const { JSDOM } = require("jsdom");
const axios = require('axios');

/* "__dirname" para ver la carpeta en donde esta ubicado nuestro archivo*/

// ---Validate if path exists--- \\
const pathExist = (filePath)=> {
    return fs.existsSync(filePath);
};

// ---Validate if path is a file---\\
const isFile = (filePath) => fs.statSync(filePath).isFile();

// ---Validate if path is absolute---\\
const validatePathAbsolute = (filePath)=> {
    return path.isAbsolute(filePath);
};

// ---Validate if path is a directory---\\
const validatePathDirectory = (filePath) =>{
    try{
        const isDirectory = fs.statSync(filePath).isDirectory();
        return isDirectory
    } catch (error) {
        console.error("An error has ocurred", error);
        return null
    }
};

// ---Transform path to absolute--- \\
const toAbsolutePath = (filePath)=>
    path.resolve(filePath);

// ---recursive function--- \\ 
    const recursive = (filePath, arrayMd = []) => {
        const stats = fs.statSync(filePath); /*para obtener info de archivo o directorio en forma de objeto */
           
        if (isFile(filePath)) {
          const absolute = toAbsolutePath(filePath);
          arrayMd.push(absolute);
        } else if (stats.isDirectory()) {
          const filesArray = fs.readdirSync(filePath);
          // readdirSync da array con nombres de archivos del filePath
          filesArray.forEach((element) => {
            const newFilePath = path.join(filePath, element);
            const newAbsolute = toAbsolutePath(newFilePath);
            recursive(newAbsolute, arrayMd);
          });
        } else {
          return null;
        }
        return arrayMd;
      };
       

// ---Validate markdown files--- \\
const validateFile = (filePath)=>
    filePath.endsWith(".md");

// ---Read markdown files--- \\
/* Version sync: const readMdFile = (file)=> {
    try { // usar promesa
        const data = fs.readFileSync(file, "utf-8");
        return data;
    } catch (err) {
        console.error(err);
    }
};*/
const readMdFile = (filePath)=> {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (error, fileContent) => {
            if (error){
                reject("An error has ocurred")
            }
            resolve(fileContent)
          });
    });
}
 
// ---Extract links from md files--- \\
const extractLinks = (fileContent, file) => {
    const md= new MarkdownIt();
    const result = md.render(fileContent);
    const dom = new JSDOM(result); // se utiliza para construir un entorno simulado del DOM a partir de un contenido dado
    const document = dom.window.document; 
    // En resumen, esta línea te permite acceder al objeto document del entorno DOM simulado creado por jsdom \\
    // can be also written with destructuration: const {document}=dom.window \\
    const links = document.querySelectorAll("a"); //  se busca todos los elementos <a> (enlaces) del documento \\
    const linksArray = [];
    links.forEach(link => {
     const href = link.href;
     const text = link.textContent.slice(0,50);
        if (href.startsWith("http")){
            linksArray.push({href, text, file});
        }
    });
    //console.log(linksArray)
    return linksArray
   };
    
// ---Verify links--- \\
const verifyLinks = (links) => {
    const linkPromises = links.map((link) => {
      return axios
        .get(link.href)
        .then((result) => {
          const validateTrue = {
            Href: link.href,
            Text: link.text,
            File: link.file,
            Status: result.status,
            StatusText: result.status <= 399 ? "Ok" : "Fail",
            /* if true return Ok, false, Fail*/
        };
          return validateTrue;
        })
        .catch((error) => {
            const validateFalse = {
                Href: link.href,
                Text: link.text,
                File: link.file,
                Status: error.message,
                StatusText: "Fail",
              };
              return validateFalse;
        })
    });
  
    return Promise.all(linkPromises);
  };
  
  
    // ---Testing if functions are working--- \\
//     /* Path Exists */       const resultPathExists = pathExist("./linkTests");
//                             console.log("--pathExist: " + resultPathExists);
//     /* Validate Path F */   const resultIsFile = isFile("./linkTests")
//                             console.log("--isFile: " + resultIsFile);
//     /* Validate Path A */   const resultvalidatePathAbsolute = validatePathAbsolute("./linkTests");
//                             console.log("--validatePathAbsolute: " + resultvalidatePathAbsolute);
//     /* absolute Path D */   const resultvalidatePathDirectory = validatePathDirectory("./linkTests");
//                             console.log("--validatePathDirectory: " + resultvalidatePathDirectory);                            
//     /* Absolute Path */     const resultToAbsolutePath = toAbsolutePath("./linkTests");
//                             console.log("--toAbsolutePath: " + resultToAbsolutePath);                   
//     /* Recursive */         const filesMd = recursive("./linkTests");
//                             console.log("--Recursive", filesMd);

//     /* Validate Path */     const resultvalidateFile = validateFile("./linkTests");
//                             console.log("--validateFile: " + resultvalidateFile);
//      /* Read Md file */     readMdFile("./linkTests/links.md")
//                                 .then(result =>{
//                                 console.log("--readMdFile" + result);
//                                 })
//                                 .catch((error) => {
//                                     console.error(error)
//                                 });                                                    
//     /* Extract Links */      readMdFile("./linkTests/links.md")
//                             .then(result =>{
//                             const resultExtractLinks = extractLinks(result, resultToAbsolutePath);
//                             console.log("--extractLinks: " + JSON.stringify(resultExtractLinks));
//                             })
//                             .catch((error) => {
//                             console.error(error)
//                             });  
//  /* Verify Links */                             
                            // const links = [
                            //     { href: './linkTests/links.md', text: 'Links', file: 'links.html' },
                            //     { href: 'https://openai.com', text: 'OpenAI', file: 'openai.html' },
                            //     { href: 'https://youtube.com', text: 'Youtube', file: 'youtube.html' },
                            //     { href: 'http://www.wikiedia.org', text: 'Wikipedia', file: 'wikipedia.html' },
                            //     { href: ' https://www.amazon.com', text: 'Amazon', file: 'amazon.html' },                              
                            //   ];
                              
                            //     verifyLinks(links)
                            //       .then((results) => console.log(results))
                            //       .catch((error) => console.error(error));
                            

// ---Export--- \\
module.exports = {
    pathExist,
    isFile,
    validatePathAbsolute,
    validatePathDirectory,
    toAbsolutePath,
    recursive,
    validateFile,
    readMdFile,
    extractLinks,
    verifyLinks,
};

// node functions.js

/*JSON.stringify() es un método en JavaScript que convierte un objeto JavaScript
 en una cadena JSON legible y fácilmente procesable. Toma un objeto o valor como argumento
  y devuelve una representación de cadena JSON.
    Ej:
        const persona = {
            nombre: "Juan",
            edad: 30,
            ciudad: "Madrid"

        const personaJSON = JSON.stringify(persona);
        console.log(personaJSON); 
        salida: {"nombre":"Juan","edad":30,"ciudad":"Madrid"}
        sin JSON: { nombre: 'Juan', edad: 30, ciudad: 'Madrid' }
};
  
  */