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


        var route, routes = [];

        expressInstance._router.stack.forEach(function(middleware){
            if(middleware.route){ // routes registered directly on the app
                routes.push(middleware.route.path+" # "+Object.keys(middleware.route.methods)[0].toUpperCase());
            } else if(middleware.name === 'router'){ // router middleware 
                middleware.handle.stack.forEach(function(handler){
                    route = handler.route;
                    route && routes.push(route.path+" # "+Object.keys(middleware.route.methods)[0].toUpperCase());
                });
            }
        });        
        console.log("routes", routes)
    };

}

module.exports = TurboCrudBackendEngine;