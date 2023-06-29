const fs = require('fs')
const axios = require('axios');
const {pathExist,               isFile,
      validatePathAbsolute,     validatePathDirectory,
      toAbsolutePath,           recursive,
      validateFile,             readMdFile,
      extractLinks,             verifyLinks,
} = require("../functions")

const {mdLinks} = require("../mdLinks")  

// ------arguments consts------ \\
const mdPath = "./linkTests/links.md";
const notMdPath = "../linkTests/links.txt";
const directoryPath = "../linkTests";
const optionsT = {validate: true}
const optionsF = {validate: false}

// ------mdLinks.js------ \\
describe("mdLinks function", ()=>{
  it("mdLinks should be a funciton", ()=>{
    expect(typeof mdLinks).toBe("function")
  });
  it("Should return an error if path doesn't exist",()=>{
    const testPath = "../linkTestss"
        // expect(mdLinks(testPath)).rejects.toMatch("Error: The path dosen't exist");
        mdLinks(testPath).catch((err)=>{
          expect(err.message).toEqual("The path dosen't exist")
        });
  });
  it("Should return a promise that is resolve with an array of objects", async()=>{
    const result = mdLinks(mdPath, optionsT);
    await expect(result).resolves.toEqual([
      {
        Href: 'https://es.wikipedia.org/wiki/Markdown',   
        Text: 'Markdown',
        File: 'E:\\Duoc\\CURSOS ONLINE\\JavaScript\\PROYECTO 4 - MD LINK\\DEV006-md-links\\linkTests\\links.md',    Status: 200,
        StatusText: 'Ok'
      },
      {
        Href: 'https://nodejs.org/',
        Text: 'Node.js',
        File: 'E:\\Duoc\\CURSOS ONLINE\\JavaScript\\PROYECTO 4 - MD LINK\\DEV006-md-links\\linkTests\\links.md',    Status: 200,
        StatusText: 'Ok'
      },
      {
        Href: 'https://www.yutu.com/',
        Text: 'yutu',
        File: 'E:\\Duoc\\CURSOS ONLINE\\JavaScript\\PROYECTO 4 - MD LINK\\DEV006-md-links\\linkTests\\links.md',    Status: 'Hostname/IP does not matc',
        StatusText: 'Fail'
      }
    ]);
  })
});

// ------function.js------ \\
describe("pathExist function", ()=>{
  /*f(x)*/it("pathExist should be a funciton", ()=>{
    expect(typeof pathExist).toBe("function")
  });
  /*true*/it("if path exists should return true",()=>{
    const path = "./linkTests";
    const result = pathExist(path);
    expect(result).toBe(true);
  });
  /*false*/it("if path doesn't exists should return false",()=>{
    const path = "./linkTestss";
    const result = pathExist(path);
    expect(result).toBe(false);
  });
})

describe("isFile function", ()=>{
  it("isFile should be a funciton", ()=>{
    expect(typeof isFile).toBe("function")
  });
  it("Shoud return true if result is a file", ()=>{
    jest.spyOn(fs, "statSync").mockReturnValue({
      isFile: () => true
    });
      const filePath = "./linkTests/links.md";
      const result = isFile(filePath);
      expect(result).toBe(true);
      expect(fs.statSync).toHaveBeenCalledWith(filePath);
  });
  it("Shoud return false if result is'n a file", ()=>{
    jest.spyOn(fs, "statSync").mockReturnValue({
      isFile: () => false
    });
      const filePath = "./linkTests/folder";
      const result = isFile(filePath);
      expect(result).toBe(false);
      expect(fs.statSync).toHaveBeenCalledWith(filePath);
  });
})

describe("validatePathAbsolute function", ()=>{
  it("validatePathAbsolute should be a funciton", ()=>{
    expect(typeof validatePathAbsolute).toBe("function")
  });
  /*true*/it("if path is absolute should return true",()=>{
    const path = String.raw`E:\Duoc\CURSOS ONLINE\JavaScript\PROYECTO 4 - MD LINK\DEV006-md-links\test/links.md`;
    const result = validatePathAbsolute(path);
    expect(result).toBe(true);
  });
  /*false*/it("if path isn't absoulte should return false",()=>{
    const path = "./linkTests/links.md";
    const result = validatePathAbsolute(path) ;
    expect(result).toBe(false);
  });
});

describe("validatePathDirectory function", ()=>{
  it("validatePathDirectory should be a funciton", ()=>{
    expect(typeof validatePathDirectory).toBe("function")
  });
  it("If path is a directory should return true",async()=>{
    const input = await validatePathDirectory('./linkTests');
    const output = true;
    expect(input).toEqual(output);
    });
    it("If path isn't a directory should return false",async()=>{
      const input = await validatePathDirectory('./linkTests/links.txt');
      const output = false;
      expect(input).toEqual(output);
      });
  });

describe("toAbsolutePath function", ()=>{
  it("toAbsolutePath should be a funciton", ()=>{
    expect(typeof toAbsolutePath).toBe("function")
  });
  it("Should trasnform to absolute path",()=>{
    const input = toAbsolutePath("./linkTests");
    const output = "E:\\Duoc\\CURSOS ONLINE\\JavaScript\\PROYECTO 4 - MD LINK\\DEV006-md-links\\linkTests";
    expect(input).toEqual(output);
  });
});

describe("recursive function", ()=>{
  it("recursive should be a funciton", ()=>{
    expect(typeof recursive).toBe("function")
  });
  it("should return an array with files", ()=>{
    jest.spyOn(fs, "statSync").mockImplementation((filePath) => {
      return {
      };
    });
    const input = recursive("./linkTests");
    const output = [
      'E:\\Duoc\\CURSOS ONLINE\\JavaScript\\PROYECTO 4 - MD LINK\\DEV006-md-links\\linkTests\\cleaner.md',
      'E:\\Duoc\\CURSOS ONLINE\\JavaScript\\PROYECTO 4 - MD LINK\\DEV006-md-links\\linkTests\\folder\\linksInsideFolder.md',
      'E:\\Duoc\\CURSOS ONLINE\\JavaScript\\PROYECTO 4 - MD LINK\\DEV006-md-links\\linkTests\\folder\\linksInsideFolder.txt',
      'E:\\Duoc\\CURSOS ONLINE\\JavaScript\\PROYECTO 4 - MD LINK\\DEV006-md-links\\linkTests\\folder\\pptInsideFolder.pptx',
      'E:\\Duoc\\CURSOS ONLINE\\JavaScript\\PROYECTO 4 - MD LINK\\DEV006-md-links\\linkTests\\folder\\textInsideFolder.md',
      'E:\\Duoc\\CURSOS ONLINE\\JavaScript\\PROYECTO 4 - MD LINK\\DEV006-md-links\\linkTests\\links.md',
      'E:\\Duoc\\CURSOS ONLINE\\JavaScript\\PROYECTO 4 - MD LINK\\DEV006-md-links\\linkTests\\links.txt',
      'E:\\Duoc\\CURSOS ONLINE\\JavaScript\\PROYECTO 4 - MD LINK\\DEV006-md-links\\linkTests\\ppt.pptx',
      'E:\\Duoc\\CURSOS ONLINE\\JavaScript\\PROYECTO 4 - MD LINK\\DEV006-md-links\\linkTests\\text.md'
    ];
    expect(input).toEqual(output)
  });
});

describe("validateFile function", ()=>{
  it("validateFile should be a funciton", ()=>{
    expect(typeof validateFile).toBe("function")
  });
    /*true*/it("if path is md should return true",()=>{
      const path = "./linkTests/links.md";
      const result = validateFile(path);
      expect(result).toBe(true);
    });
    /*false*/it("if path isn't md should return false",()=>{
      const path = "./linkTests/links.txt";
      const result = validateFile(path);
      expect(result).toBe(false);
    });
});

describe("readMdFile function", ()=>{
  it("readMdFile should be a funciton", ()=>{
    expect(typeof readMdFile).toBe("function")
  });
  it("Should read markdown file",()=>{
    const input = readMdFile("./linkTests/cleaner.md");
  const output = `[Markdown](https://es.wikipedia.org/wiki/Markdown) markdown file---[Node.js](https://nodejs.org/) node.js---[yutu](https://www.yutu.com/) youtube.`;

  expect(input).toBe(output);
  });
});

describe("extractLinks function", ()=>{
  it("extractLinks should be a funciton", ()=>{
    expect(typeof extractLinks).toBe("function")
  });
  it("Should extract all the links with href, text adn file",()=>{
    const fileContent = `[Markdown](https://es.wikipedia.org/wiki/Markdown) markdown file---[Node.js](https://nodejs.org/) node.js---[yutu](https://www.yutu.com/) youtube.`;;
    const file = "./linkTests/cleaner.md";
    const input = extractLinks(fileContent, file);
    const output =  [{"href":"https://es.wikipedia.org/wiki/Markdown","text":"Markdown","file":"E:\\Duoc\\CURSOS ONLINE\\JavaScript\\PROYECTO 4 - MD LINK\\DEV006-md-links\\linkTests"},{"href":"https://nodejs.org/","text":"Node.js","file":"E:\\Duoc\\CURSOS ONLINE\\JavaScript\\PROYECTO 4 - MD LINK\\DEV006-md-links\\linkTests"},{"href":"https://www.yutu.com/","text":"yutu","file":"E:\\Duoc\\CURSOS ONLINE\\JavaScript\\PROYECTO 4 - MD LINK\\DEV006-md-links\\linkTests"}]
    expect(input).toEqual(output);

  });
});

describe("verifyLinks function", ()=>{
  it("verifyLinks should be a funciton", ()=>{
    expect(typeof verifyLinks).toBe("function")
  });
    it("sould call get from axios", ()=>{
      const resultStatus = {Status:200}
      const validation = {Status:200}
      axios.get = jest.fn(()=>Promise.resolve(resultStatus));
      return verifyLinks().then(res=>{
        expect(res).toEqual(validation);
      });
    });
});


