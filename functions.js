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
const { extractLinks } = require("axios-http-link-parser");

const getLinks = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const links = extractLinks(fileContent, filePath);
  return links;
};

// Ejemplo de uso
const filePath = "./linkTests/links.md";

const links = getLinks(filePath);
console.log(links);

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