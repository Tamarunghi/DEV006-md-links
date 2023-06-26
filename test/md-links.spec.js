const {pathExist,               isFile,
      validatePathAbsolute,     validatePathDirectory,
      toAbsolutePath,           recursive,
      validateFile,             readMdFile,
      extractLinks,             verifyLinks,
} = require("../functions")

const {mdLinks} = require("../mdLinks")  


// ------should be a function------ \\
describe("mdLinks function", ()=>{
  it("mdLinks should be a funciton", ()=>{
    expect(typeof mdLinks).toBe("function")
  });
  it("should return an error if path doesn't exist",()=>{
    const testPath = "./linkTests/fakeFile.md"
    expetct(mdLinks(testPath)).rejects.toEqual("The path dosen't exist");
  })
});

describe("pathExist function", ()=>{
  it("pathExist should be a funciton", ()=>{
    expect(typeof pathExist).toBe("function")
  })
})

describe("isFile function", ()=>{
  it("isFile should be a funciton", ()=>{
    expect(typeof isFile).toBe("function")
  })
})

describe("validatePathAbsolute function", ()=>{
  it("validatePathAbsolute should be a funciton", ()=>{
    expect(typeof validatePathAbsolute).toBe("function")
  })
})

describe("validatePathDirectory function", ()=>{
  it("validatePathDirectory should be a funciton", ()=>{
    expect(typeof validatePathDirectory).toBe("function")
  })
})

describe("toAbsolutePath function", ()=>{
  it("toAbsolutePath should be a funciton", ()=>{
    expect(typeof toAbsolutePath).toBe("function")
  })
})

describe("recursive function", ()=>{
  it("recursive should be a funciton", ()=>{
    expect(typeof recursive).toBe("function")
  })
})

describe("validateFile function", ()=>{
  it("validateFile should be a funciton", ()=>{
    expect(typeof validateFile).toBe("function")
  })
})

describe("readMdFile function", ()=>{
  it("readMdFile should be a funciton", ()=>{
    expect(typeof readMdFile).toBe("function")
  })
})

describe("extractLinks function", ()=>{
  it("extractLinks should be a funciton", ()=>{
    expect(typeof extractLinks).toBe("function")
  })
})

describe("verifyLinks function", ()=>{
  it("verifyLinks should be a funciton", ()=>{
    expect(typeof verifyLinks).toBe("function")
  })
})
