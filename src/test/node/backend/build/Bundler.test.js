const appDir = process.cwd();
const chai = require('chai');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { v4: uuidv4 } = require('uuid');
const expect = chai.expect;
const assert = chai.assert;
const Bundler = require("../../../../main/node/backend/build/Bundler.js");

describe('Bundler', function () {

  it('should inject the require sentences with the expected scripts', async function () {
    var bundler= new Bundler();
    var result = await bundler.injectRequireSentences(path.join(__dirname, "entrypoint.js"),__dirname);
    expect(result).to.contains("I'm the jane script");
    expect(result).to.contains("I'm the Doe script");
  });

});
