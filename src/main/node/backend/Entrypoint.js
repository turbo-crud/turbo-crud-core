
var log4js = require("log4js");
var logger = log4js.getLogger();
const path = require('path');
const fs = require('fs');
const Publisher = require("./Publisher.js");
const Builder = require("./Builder.js");
const Server = require("./Server.js");
const NewSite = require("./NewSite.js");
const Common = require("./Common.js");
const finder = require('find-package-json');
const chokidar = require('chokidar');
const yaml = require('js-yaml');
const { Exception } = require('handlebars');
const util = require("util");
const fsExtra = require("fs-extra");
const copyPromise = util.promisify(fsExtra.copy);
const TurboCrudBackendEngine = require("./core/TurboCrudBackendEngine.js");
const Bundler = require("./build/Bundler.js");

function Entrypoint() {

    this.server;

    this.start = async (shellOptions, projectBaseLocationToOverride) => {

        console.log("Entrypoint arguments", shellOptions)

        var f = finder(__filename);
        var frameworkLocation = path.dirname(f.next().filename);
        console.debug("FrameworkLocation", frameworkLocation);

        if (typeof shellOptions.newSite !== 'undefined') {
            console.log("Creating new site")
            var newSite = new NewSite();
            await newSite.start(shellOptions.newSite, process.cwd(), frameworkLocation);
            return;
        }

        if (typeof shellOptions.start === 'undefined' && typeof shellOptions.publish === 'undefined') {
            console.log("One of this commands are required: --start or --publish")
            return;
        }

        if (shellOptions.start !== true && shellOptions.publish !== true) {
            console.log("These parameters are mutually exclusive: --start and --publish")
            return;
        }

        var projectBaseLocation = projectBaseLocationToOverride || process.cwd();

        var siteFolderName = shellOptions.output;

        var siteFolderLocation;
        var themeLocation;
        var configDataSourceAbsoluteLocation;

        //calling is from inside of framework
        if (frameworkLocation === projectBaseLocation) {
            siteFolderLocation = path.join(frameworkLocation, siteFolderName)
            themeLocation = path.join(frameworkLocation, "theme");
            configDataSourceAbsoluteLocation = path.join(frameworkLocation, "src", "main", "resources", "archetype", "fp-admin.yaml");
        } else { //calling is from any folder in the os
            siteFolderLocation = path.join(projectBaseLocation, siteFolderName)
            configDataSourceAbsoluteLocation = path.join(projectBaseLocation, "fp-admin.yaml");
            try {
                await fs.promises.access(path.join(projectBaseLocation, "theme"), fs.constants.F_OK)
                themeLocation = path.join(projectBaseLocation, "theme");
            } catch (e) {
                //external theme folder was not found. Default will be used
                themeLocation = path.join(__dirname, "..", "..", "..", "theme");
            }
        }

        console.log("Config", configDataSourceAbsoluteLocation);
        var frontendControllersAbsoluteLocation = path.join(projectBaseLocation, "src","main","node","frontend");
        console.log("Frontend", frontendControllersAbsoluteLocation);
        var port = process.env.PORT || 2501;

        try {
            await fs.promises.access(siteFolderLocation, fs.constants.F_OK)
            siteFolderExists = true;
        } catch (e) {
            siteFolderExists = false;
        }

        if (siteFolderExists === true) {
            try {
                await fs.promises.rm(siteFolderLocation, { recursive: true });
                console.debug("Success purge: " + siteFolderLocation)
            } catch (e) {
                console.log("Failed to clear the site folder: " + siteFolderLocation);
                console.error(e);
                process.exit(1);
            }
        }
        await fs.promises.mkdir(siteFolderLocation)

        var rawConfigDataSource = await fs.promises.readFile(configDataSourceAbsoluteLocation, "utf8");
        let frameworkOptions = yaml.loadAll(rawConfigDataSource)[0];
        console.debug(`FrameworkOptions: ${JSON.stringify(frameworkOptions)}`);

        console.log("Folders", JSON.stringify({ projectBaseLocation, siteFolderLocation, themeLocation }))

        //TODO: move to another module or plugin
        var publisher = new Publisher();
        await publisher.start(themeLocation, siteFolderLocation, frontendControllersAbsoluteLocation);
        console.log("Move initial files to publish folder is completed")

        var bundler = new Bundler();
        var frontendEntrypointFileContent = 
            await bundler.execute(path.join(frontendControllersAbsoluteLocation, "Entrypoint.js"),frontendControllersAbsoluteLocation);

        await fs.promises.writeFile(path.join(siteFolderLocation, "Entrypoint.js"), frontendEntrypointFileContent);


        if (shellOptions.start === true) {
            this.server = new Server();
            await this.server.start(port, siteFolderLocation);
            var turboCrudBackendEngine = new TurboCrudBackendEngine();
            turboCrudBackendEngine.start(frameworkOptions, this.server.getExpressInstance());
        }

    };

    this.getServer = () => {
        return this.server;
    }

}

module.exports = Entrypoint;