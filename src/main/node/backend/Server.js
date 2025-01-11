const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');

function Server(){

  var serverInstance;
  var expressInstance;
  
  this.start = async (port, absoluteSiteFolder) => {
    expressInstance = express();    
    expressInstance.use(express.static(absoluteSiteFolder));

    // Parses the text as url encoded data
    expressInstance.use(bodyParser.urlencoded({ extended: true }));

    // Parses the text as json
    expressInstance.use(bodyParser.json());

    // set the home page route
    expressInstance.get('/', function(req, res) {
        res.sendFile(path.join(absoluteSiteFolder, 'index.html'));
    });

    return new Promise((resolve, reject) => {
      serverInstance = expressInstance.listen(port, () => {
        console.log('TurboCrud is running on ' + port);
        resolve(serverInstance);
      });
    });

  }

  this.shutdown = async (port, absoluteSiteFolder) => {
    await serverInstance.close();
  }

  this.getExpressInstance = () => {
    return expressInstance;
  }

}

module.exports = Server;
