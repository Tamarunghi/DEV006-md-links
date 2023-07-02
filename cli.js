// ---functions Import--- \\
const { error } = require("console");
const { mdLinks: MdLinksCli } = require("./mdLinks");
const fs = require('fs');

const userPath = process.argv[2];
const userOptions = process.argv[3];

MdLinksCli(userPath, {option: userOptions})
.then((links)=>{

    console.log(links);
})
.catch((error)=>{

    console.error(error);
});
