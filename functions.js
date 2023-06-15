// ---Imports--- \\
const fs = require("fs");
const path = require("path");

/* "__dirname" para ver la carpeta en donde esta ubicado nuestro archivo*/

// ---Validate if path exists--- \\
const pathExists = (filePath)=> {
    return fs.existsSync(filePath);
};

// ---Validate if path is absolute---\\
const validatePath = (filePath)=> {
    return path.isAbsolute(filePath);
};

// ---Transform path to absolute--- \\
const absolutePath = (filePath)=>
    path.resolve(filePath);

// ---Find markdown files--- \\
const findPath = (filePath)=>
    filePath.endsWith(".md");

// ---Find markdown files--- \\
const readMdFile = (file)=> {
    try {
        const data = fs.readFileSync(file, "utf-8");
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
    }
};

// ---Testing if functions are working--- \\
    /* Path Exists */   const resultPathExists = pathExists("./linkTests");
                        console.log("pathExists: " + resultPathExists);
    /* Validate Path */ const resultValidatePath = validatePath("./linkTests");
                        console.log("validatePath: " + resultValidatePath);                        
    /* absolute Path */ const resultAbsolutePath = absolutePath("./linkTests");
                        console.log("absolutePath: " + resultAbsolutePath);
    /* Find Path */     const resultFindPath = findPath("./linkTests");
                        console.log("findPath: " + resultFindPath);
     /* Read Md file */ const resultReadMdFile = readMdFile("./linkTests/links.txt");
                        console.log("readMdFile: " + resultReadMdFile);

// ---Import--- \\
module.exports = {
    pathExists,
    validatePath,
    absolutePath,
    findPath
};