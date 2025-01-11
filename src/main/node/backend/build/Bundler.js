const fs = require("fs");
const path = require("path");

function Bundler() {

    this.execute = async (entryPointFileabsolutePath, frontendFolder) => {
        var rawEntrypointContent = await fs.promises.readFile(entryPointFileabsolutePath, "utf8");

        var requireMatches = rawEntrypointContent.match(/const\s*\w+\s*=\s*require\(".+"\);/g);
        var entrypointContent = await injectRequireSentences(requireMatches, entryPointFileabsolutePath, frontendFolder, rawEntrypointContent);
        return entrypointContent;

    }

    async function injectRequireSentences(requireMatches, entryPointFileabsolutePath, frontendFolder, rawEntrypointContent){

        if(!requireMatches){
            return "";
        }

        console.log(requireMatches);

        var scriptLocations = [];
        requireMatches.forEach(function (requireMatch, index) {
            var parts = requireMatch.split('"');
            var resourceLocation = path.join(frontendFolder, parts[1]);
            scriptLocations.push(resourceLocation);
        });

        for (var i=0; i<scriptLocations.length; i++) {
            var resourceLocation = scriptLocations[i];
            console.log("resourceLocation", resourceLocation)
            var scriptContent = await fs.promises.readFile(resourceLocation, "utf8");
            // console.log("scriptContent", scriptContent)
            if(resourceLocation.endsWith(".js")){
                rawEntrypointContent = rawEntrypointContent.replace(requireMatches[i], scriptContent+"\n");    
                // console.log("js", rawEntrypointContent)
            }else if(resourceLocation.endsWith(".html")){
                //get const name
                var constName = requireMatches[i].split("=")[0].trim().replace(/\s*const\s*/, "");
                rawEntrypointContent = rawEntrypointContent.replace(requireMatches[i], `function ${constName}(){
                    var html = \`${scriptContent}\`
                    this.rawHtml = () => {
                        return html;
                    }
                }`)

                // console.log("html", rawEntrypointContent)
            }else{
                console.log("Require doesn't support this format: "+resourceLocation);
            }
            
        }

        return rawEntrypointContent;
    }

}

module.exports = Bundler;