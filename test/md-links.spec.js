const fs = require('fs')
const axios = require('axios');
const {pathExist,               isFile,
      validatePathAbsolute,     validatePathDirectory,
      toAbsolutePath,           recursive,
      validateFile,             readMdFile,
      extractLinks,             verifyLinks,
} = require("../functions")

const {mdLinks} = require("../mdLinks")  

jest.mock("axios",()=>({
  get: (href)=>Promise.resolve({status: 200})
}));

// ------mdLinks.js------ \\
describe("mdLinks function", ()=>{
  it("Should return an error if path doesn't exist",()=>{
    const testPath = "../linkTestss"
        mdLinks(testPath).catch((err)=>{
          expect(err.message).toEqual("The path dosen't exist")
        });
  });
    it("Should return a promise that is resolve with an array of objects", async()=>{
    const mdPath = "./linkTests/links.md";
    const optionsF = {validate: false}
    const result = mdLinks(mdPath, optionsF);
    await expect(result).resolves.toEqual([
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'E:\\Duoc\\CURSOS ONLINE\\JavaScript\\PROYECTO 4 - MD LINK\\DEV006-md-links\\linkTests\\links.md'
      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'E:\\Duoc\\CURSOS ONLINE\\JavaScript\\PROYECTO 4 - MD LINK\\DEV006-md-links\\linkTests\\links.md'
      },
      {
        href: 'https://www.yutu.com/',
        text: 'yutu',
        file: 'E:\\Duoc\\CURSOS ONLINE\\JavaScript\\PROYECTO 4 - MD LINK\\DEV006-md-links\\linkTests\\links.md'
      }
    ]);
  });
});

// ------pathExist------ \\
describe("pathExist function", ()=>{
  it("if path exists should return true",()=>{
    const path = "./linkTests";
    const result = pathExist(path);
    expect(result).toBe(true);
  });
  it("if path doesn't exists should return false",()=>{
    const path = "./linkTestss";
    const result = pathExist(path);
    expect(result).toBe(false);
  });
})

// ------isFile------ \\
describe("isFile function", ()=>{
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

// ------validatePathAbsolute------ \\
describe("validatePathAbsolute function", ()=>{
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

// ------validatePathDirectory------ \\
describe("validatePathDirectory function", ()=>{
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

  // ------toAbsolutePath------ \\
describe("toAbsolutePath function", ()=>{
  it("toAbsolutePath should be a funciton", ()=>{
    expect(typeof toAbsolutePath).toBe("function")
  });
});

  // ------Recursive------ \\
describe("recursive function", ()=>{
  it("recursive should be a funciton", ()=>{
    expect(typeof recursive).toBe("function")
  });
});

  // ------validateFile------ \\
describe("validateFile function", ()=>{
    it("if path is md should return true",()=>{
      const path = "./linkTests/links.md";
      const result = validateFile(path);
      expect(result).toBe(true);
    });
    it("if path isn't md should return false",()=>{
      const path = "./linkTests/links.txt";
      const result = validateFile(path);
      expect(result).toBe(false);
    });
});

  // ------readMdFile------ \\
describe("readMdFile function", ()=>{
  it("Should return a promise and read markdown file",(done)=>{
    const promise = readMdFile("./linkTests/cleaner.md");
    const output = `[Markdown](https://es.wikipedia.org/wiki/Markdown) markdown file---[Node.js](https://nodejs.org/) node.js---[yutu](https://www.yutu.com/) youtube.`;
    promise.then((content)=>{
      expect(content).toBe(output);
      done();
    })
    .catch((error)=>{
      done(error)
    });
  });
});

  // ------extractLinks------ \\
describe("extractLinks function", ()=>{
  it("extractLinks should be a funciton", ()=>{
    expect(typeof extractLinks).toBe("function")
  });
});

  // ------verifyLinks------ \\
describe("verifyLinks function", ()=>{
    it("sould call get from axios", ()=>{
      const links =  [{"href":"https://es.wikipedia.org/wiki/Markdown","text":"Markdown","file":"E:\\Duoc\\CURSOS ONLINE\\JavaScript\\PROYECTO 4 - MD LINK\\DEV006-md-links\\linkTests"}];
      const verifiedLinks = verifyLinks(links)
    expect(verifiedLinks).resolves.toEqual([
      {
        Href: 'https://es.wikipedia.org/wiki/Markdown',
        Text: 'Markdown',
        File: 'E:\\Duoc\\CURSOS ONLINE\\JavaScript\\PROYECTO 4 - MD LINK\\DEV006-md-links\\linkTests',
        Status: 200,
        StatusText: 'Ok'
      }
    ]);
    });
    });

  


