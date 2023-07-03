// ---functions Import--- \\
const { error } = require("console");
const { mdLinks: MdLinksCli } = require("./mdLinks");
const fs = require('fs');
const colors = {
    blue: "\x1b[38;5;38m",
    teal: "\x1b[38;5;69m",
    orange: "\x1b[38;5;215m",
    yellow: "\x1b[38;5;220m",
    red: "\x1b[38;5;160m",
    celest: "\x1b[38;5;158m",
    green: "\x1b[38;5;41m",
    white: "\x1b[38;5;231m",
    reset: "\x1b[0m", // Reset to default color
};

const userPath = process.argv[2];
const userOptions = process.argv[3] === "true";

const userHelpOption = process.argv.includes("--help");

switch (true) {
    case userHelpOption:
      console.log(`${colors.green}Write the path and then write true to validate the links, and false to not to.${colors.reset}`);
      break;
    case ((userOptions !== true && userOptions !== false) && (!userPath || !fs.existsSync(userPath))):
      console.log(`${colors.red}Invalid path or option provided, please try again.${colors.reset}`);
      break;
    case (userOptions !== true && userOptions !== false):
      console.log(`${colors.red}Invalid path or option provided, please try again.${colors.reset}`);
      break;
    case (!userPath || !fs.existsSync(userPath)):
      console.log(`${colors.red}Invalid path or option provided, please try again.${colors.reset}`);
      break;
    default:
        MdLinksCli(userPath, { validate: userOptions })
    .then((links) => {
      console.log(links);
    })
    .catch((error) => {
      console.error(`${colors.red}An error has occurred: ${error.message}.${colors.reset}`);
    });
  break;
  }