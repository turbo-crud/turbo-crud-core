const HttpHelper = require("../http/HttpHelper.js");

function SystemRoutes(){

    this.simpleMenu = [];
    this.entities = [];

    this.start = (entities, expressInstance) => {
        // this.simpleMenu = entities.map(function(el) {
        //     return {name: el.name, icon: el.icon, label: el.label};
        // });
        this.entities = entities;
        expressInstance.get("/system/ui-settings", this.uiSettings);
        expressInstance.get("/system/stats", this.stats);
    }

    this.uiSettings = (req, res)  => {
        return res.json(HttpHelper.ok(this.entities));
    }

    this.stats = (req, res)  => {
        return res.json(HttpHelper.ok([{label: "Paciente", value: 51}, 
        {label: "Examenes", value: 124}]));
    }    

}

module.exports = SystemRoutes;