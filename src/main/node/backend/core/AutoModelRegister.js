const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function AutoModelRegister(){

    this.start = (entities) => {
      var models = {};
      for(var entity of entities){
        let schemaInfo = {};
        for(var field of entity.fields){
            var type;
            switch(field.type){
               case "string": 
                 type = String;
               break; 
               case "number": 
                 type = Number;
               break;         
               case "date": 
                 type = Date;
               break;                       
            }

            schemaInfo[field.name] = {
                "type": type,
                "unique" : field.unique, 
                "required" : field.required
            };
        }
        console.log(schemaInfo)
        models[entity.name]= mongoose.model(entity.name, new Schema(schemaInfo), entity.name)
      }

      return models;
    }

}

module.exports = AutoModelRegister;