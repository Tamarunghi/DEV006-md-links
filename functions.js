// ---Imports--- \\
const fs = require("fs");
const path = require("path");
const MarkdownIt = require("markdown-it");
const { JSDOM } = require("jsdom");

/* "__dirname" para ver la carpeta en donde esta ubicado nuestro archivo*/

// ---Validate if path exists--- \\
const pathExists = (filePath)=> {
    return fs.existsSync(filePath);
};

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
const absolutePath = (filePath)=>
    path.resolve(filePath);

// ---Find markdown files--- \\
const fidMdFiles = (filePath)=>
    filePath.endsWith(".md");

// ---Read markdown files--- \\
const readMdFile = (file)=> {
    try { // no usar try, usar then
        const data = fs.readFileSync(file, "utf-8");
        return data;
    } catch (err) {
        console.error(err);
    }
};

// ---Extract links from md files--- \\
const extractLinks = (file) => {
const md= new MarkdownIt();
const result = md.render(file);
const dom = new JSDOM(result); // se utiliza para construir un entorno simulado del DOM a partir de un contenido dado
const document = dom.window.document; 
// En resumen, esta línea te permite acceder al objeto document del entorno DOM simulado creado por jsdom \\
// can be also written with destructuration: const {document}=dom.window \\
const links = document.querySelectorAll("a"); //  se busca todos los elementos <a> (enlaces) del documento \\

const linksArray = [];
links.forEach(link => {
 const href = link.href;
    if (href.startsWith("https")){
        linksArray.push(href);
    }
});
return linksArray;  
};

const mdFilePath = "./linkTests/links.md";
const mdFileContent = readMdFile(mdFilePath);

const test = extractLinks(mdFileContent);
console.log("extractLinks: ", JSON.stringify(test));

// ---Testing if functions are working--- \\
    /* Path Exists */       const resultPathExists = pathExists("./linkTests");
                            console.log("pathExists: " + resultPathExists);
    /* Validate Path A */   const resultvalidatePathAbsolute = validatePathAbsolute("./linkTests");
                            console.log("validatePathAbsolute: " + resultvalidatePathAbsolute);
    /* absolute Path D */   const resultvalidatePathDirectory = validatePathDirectory("./linkTests");
                            console.log("validatePathDirectory: " + resultvalidatePathDirectory);                            
    /* absolute Path */     const resultAbsolutePath = absolutePath("./linkTests");
                            console.log("absolutePath: " + resultAbsolutePath);                   
    /* Find Path */         const resultfidMdFiles = fidMdFiles("./linkTests");
                            console.log("fidMdFiles: " + resultfidMdFiles);
     /* Read Md file */     const resultReadMdFile = readMdFile("./linkTests/links.md");
                            console.log("readMdFile: " + resultReadMdFile);

// ---Import--- \\
module.exports = {
    pathExists,
    resultvalidatePathAbsolute,
    resultvalidatePathDirectory,
    absolutePath,
    fidMdFiles,
    readMdFile,
};

// node functions.js