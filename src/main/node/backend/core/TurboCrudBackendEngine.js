const mongoose = require('mongoose');

const AutoModelRegister = require('./AutoModelRegister');
var autoModelRegister = new AutoModelRegister();
const AutoRouterRegister = require('./AutoRouterRegister');
var autoRouterRegister = new AutoRouterRegister();
const SystemRoutes = require('./SystemRoutes');
var systemRoutes = new SystemRoutes();

function TurboCrudBackendEngine() {

    this.start = async (options, expressInstance) => {

        const mongoURI = `mongodb://${options.database.user}:${options.database.password}@${options.database.domain}/${options.database.db}`

        mongoose.connect(mongoURI) 
        console.log('Mongo connected')        

        var models = autoModelRegister.start(options.entities);
        console.log(models);
        autoRouterRegister.start(options.entities, models, expressInstance);   
        systemRoutes.start(options.entities, expressInstance);   

    };

}

module.exports = TurboCrudBackendEngine;