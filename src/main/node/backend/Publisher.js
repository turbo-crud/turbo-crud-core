const util = require("util");
const fs = require("fs");
const fsExtra = require("fs-extra");
const path = require("path");
const { rimraf } = require("rimraf");
const copyPromise = util.promisify(fsExtra.copy);

function Publisher(){
  
  this.start = async (themeLocation, siteFolderLocation, frontendControllersAbsoluteLocation) => {   
    await copyPromise(themeLocation, siteFolderLocation);
  }
}

module.exports = Publisher;
